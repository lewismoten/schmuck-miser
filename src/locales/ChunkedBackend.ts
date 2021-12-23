import { BackendModule, ReadCallback, Services, InitOptions, ResourceKey } from "i18next";

export interface IResourceModule {
  default: ResourceKey
}

function isResourceModule(value: any): value is IResourceModule {return typeof value.default === "object";}

const defaultLoader = (language: string, namespace: string): Promise<ResourceKey> => 
  import(`./${language}/${namespace}`)
  .then(
    (resource: IResourceModule | ResourceKey) => 
    isResourceModule(resource) ? resource.default : resource
  );

export interface ChunkedOptions {
  loader? (language: string, namespace: string): Promise<ResourceKey>
}

const defaultOptions: ChunkedOptions = {
  loader: defaultLoader
}

class ChunkedBackend implements BackendModule<ChunkedOptions> {
  static type: 'backend';
  constructor(services: Services, chunkedOptions: ChunkedOptions = defaultOptions, i18nextOptions: InitOptions = {}) {
    this.type = 'backend';
    this.services = services;
    this.options = chunkedOptions;
    this.init(services, chunkedOptions, i18nextOptions)
  }
  init(services: Services, chunkedOptions: ChunkedOptions = defaultOptions, i18nextOptions: InitOptions = {}): void {
    // Why are chunkedOptions undefined? How do we tell i18next that 'chunked' key is for us?
    this.services = services;
    this.options = {
      ...defaultOptions,
      ...i18nextOptions.chunked || {},
      ...chunkedOptions
    };
  }
  read(language: string, namespace: string, done: ReadCallback): void {
    const load = this.options.loader || defaultLoader;
    load(language, namespace)
        .then(resourceKey => done(null, resourceKey))
        .catch(e => done(e, false));
  }
  type:'backend';
  services: Services;
  options: ChunkedOptions;
}

ChunkedBackend.type = 'backend';

declare module 'i18next' {
  interface PluginOptions {
    chunked?: ChunkedOptions
  }
}
export default ChunkedBackend;
