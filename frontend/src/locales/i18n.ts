import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from './ru/common.json';
import commonEditors from './ru/editors/commonEditors.json';
import commonComponents from './ru/commonComponents.json';
import profile from './ru/profile.json';
import project from './ru/project.json';
import projects from './ru/projects.json';
import validationMessage from './ru/validationMessage.json';
import containerEditor from './ru/editors/containerEditor.json';
import dictEditor from './ru/editors/dictEditor.json';
import diffmergeEditor from './ru/editors/diffmergeEditor.json';
import helpEditor from './ru/editors/helpEditor.json';
import modelEditor from './ru/editors/modelEditor.json';
import profileEditor from './ru/editors/profileEditor.json';
import schemaEditor from './ru/editors/schemaEditor.json';
import securityEditor from './ru/editors/securityEditor.json';
import projectEditor from './ru/editors/projectEditor.json';
import errorCodes from './ru/errorCodes.json';
import modelGraphEditor from './ru/editors/modelGraphEditor.json';

export enum Language {
  Ru = 'ru-RU',
}

export const resources = {
  [Language.Ru]: {
    commonEditors,
    errorCodes,
    common,
    commonComponents,
    profile,
    project,
    projects,
    containerEditor,
    dictEditor,
    modelGraphEditor,
    diffmergeEditor,
    helpEditor,
    modelEditor,
    profileEditor,
    schemaEditor,
    securityEditor,
    projectEditor,
    validationMessage,
  },
} as const;

export const defaultNS = 'common';

const nameSpacing = Object.keys(resources[Language.Ru]);

i18n.use(initReactI18next).init({
  ns: nameSpacing,
  defaultNS,
  resources,
  lng: Language.Ru,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
