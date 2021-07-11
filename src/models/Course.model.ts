import { SkillCategory } from './SkillCategory.enum';

export class Course {
  constructor(
    public id: string = '',
    public name: string = '',
    public organization: string = '',
    public description: string = '',
    public studyHours: number | null = null,
    public dateCompleted: string = '',
    public categories: SkillCategory[] = [],
    public certificationLink: string = '',
    public certificationId: string = '',
    public imgUrl: string = ''
  ) {}
}
