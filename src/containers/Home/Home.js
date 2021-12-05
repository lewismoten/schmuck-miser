import React from 'react';
import Paper from '@mui/material/Paper';
import Page from '../../components/Page';
import { LoremIpsum } from 'lorem-ipsum';
import Typography from '@mui/material/Typography';
import './i18n';
import { useTranslation, Trans } from 'react-i18next';

const lorem = new LoremIpsum();

const Home = () => {
  const { t } = useTranslation();

  return (
    <Page title={t('page.title')}>
      <Trans i18nKey="page.header">
        This <div>is</div> an example.
      </Trans>
      <Paper>
        {lorem
          .generateParagraphs(10)
          .split('\n')
          .map((paragraph, index) => (
            <Typography key={index} variant="body1" paragraph gutterBottom>
              {paragraph}
            </Typography>
          ))}
      </Paper>
    </Page>
  );
};

export default Home;
