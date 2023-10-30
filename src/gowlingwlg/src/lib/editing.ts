import {
  EditingDataDiskCache,
  BasicEditingDataService,
  ServerlessEditingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';

// Override the default editingDataDiskCache with an accessible temp directory
export const editingDataDiskCache = new EditingDataDiskCache('C:\\temp');

// Override default editingDataService to use editingDataDiskCache for BasicEditingDataService
export const editingDataService = process.env.VERCEL
  ? new ServerlessEditingDataService()
  : new BasicEditingDataService({
      editingDataCache: editingDataDiskCache,
    });
