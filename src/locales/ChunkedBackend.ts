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

class ChunkedBackend implements BackendModule<ChunkedOptions> {
  constructor(services: Services, chunkedOptions: ChunkedOptions = {}, i18nextOptions: InitOptions = {}) {
    this.type = 'backend';
    this.services = services;
    this.options = chunkedOptions;
    this.init(services, chunkedOptions, i18nextOptions)
  }
  init(services: Services, chunkedOptions: ChunkedOptions, i18nextOptions: InitOptions): void {
    this.services = services;
    this.options = chunkedOptions;
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

declare module 'i18next' {
  interface PluginOptions {
    chunked?: ChunkedOptions
  }
}
export default ChunkedBackend;
