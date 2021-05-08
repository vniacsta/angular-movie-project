import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaItemService {
  constructor(private http: HttpClient) {}

  get(medium: string) {
    const getOptions = {
      params: { medium }
    };

    return this.http
      .get<MediaItemResponse>('mediaitems', getOptions)
      .pipe(map((response) => response.mediaItems), catchError(this.handleError));
  }

  add(mediaItem: string) {
    return this.http.post('mediaitems', mediaItem).pipe(catchError(this.handleError));
  }

  delete(mediaItem: MediaItem) {
    return this.http.delete(`mediaitems/${mediaItem.id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('A data error occurred, please try again.')
  }
}

interface MediaItemResponse {
  mediaItems: MediaItem[];
}

export interface MediaItem {
  id: number;
  name: string;
  medium: string;
  category: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}
