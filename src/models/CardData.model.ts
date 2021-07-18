export class CardData {
  constructor(
    public id: string = 'id',
    public title: string = '',
    public subtitle: string | [] = '',
    public imgUrl: string = '',
    public text: string | [] = '',
    public date: string = ''
  ) {}
}
