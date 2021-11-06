export interface IHomePresenter {
  getGroupIds(keyword: string): number[];
  getGroupName(id: number): string | undefined;
}
