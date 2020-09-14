import { Observable } from 'rxjs';
import { Boe } from '../../models';

export interface BoeAdapter {
  findBoeByDate(date: Date): Observable<Boe>;
  findBoeByDateRange(dateStart: Date, dateEnd: Date): Observable<Boe>;
}
