import { Boe } from '../../../data/models/boe.model';
import { Observable } from 'rxjs';

export interface BoeAdapter {
  findBoeByDate(date: Date): Observable<Boe>;
  findBoeByDateRange(dateStart: Date, dateEnd: Date): Observable<Boe[]>;
}
