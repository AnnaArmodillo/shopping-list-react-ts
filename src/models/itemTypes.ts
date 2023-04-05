export interface Item {
  id: string;
  title: string;
  cost: string;
  status: 'active' | 'bought' | 'deleted';
}
