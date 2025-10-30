    import { atom } from 'jotai';

    
interface Employee {
  id: string;
  name: string;
  role: string;
  salary: number;
  isBonus: boolean;
}
export const employeeAtom = atom<Employee[]>([]);
