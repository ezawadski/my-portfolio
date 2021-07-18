import { CloudProvider } from './enums/CloudProvider.enum';
import { Database } from './enums/Database.enum';
import { Framework } from './enums/Framework.enum';
import { Language } from './enums/Language.enum';

export class Project {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public dateCompleted: string = '',
    public languages: Language[] = [],
    public frameworks: Framework[] = [],
    public databases: Database[] = [],
    public cloudProviders: CloudProvider[] = [],
    public coverImgUrl: string = '',
    public imgUrls: ImgUrls = {}
  ) {}
}

export interface ImgUrls {
  [name: string]: string;
}
