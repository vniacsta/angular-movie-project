import {
  HttpEvent,
  HttpRequest,
  HttpResponse,
  HttpBackend,
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
  private mediaItems = [
    {
      id: 1,
      name: 'The Magicians',
      medium: 'Series',
      category: 'Fantasy',
      year: 2015,
      watchedOn: 1602347400000,
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Pulp Fiction',
      medium: 'Movies',
      category: 'Drama',
      year: 1994,
      watchedOn: 1340469000000,
      isFavorite: true,
    },
    {
      id: 3,
      name: 'Intouchables',
      medium: 'Movies',
      category: 'Comedy',
      year: 2012,
      watchedOn: 1404491400000,
      isFavorite: false,
    },
    {
      id: 4,
      name: 'Game of Thrones',
      medium: 'Series',
      category: 'Fantasy',
      year: 2011,
      watchedOn: 1611333000000,
      isFavorite: true,
    },
    {
      id: 5,
      name: 'Coco',
      medium: 'Movies',
      category: 'Animation',
      year: 2017,
      watchedOn: 1514565000000,
      isFavorite: false,
    },
    {
      id: 6,
      name: 'Avengers: Endgame',
      medium: 'Movies',
      category: 'Fantasy',
      year: 2019,
      watchedOn: 1556555400000,
      isFavorite: false,
    },
    {
      id: 7,
      name: 'Mr. Robot',
      medium: 'Series',
      category: 'Drama',
      year: 2015,
      watchedOn: 1606514400000,
      isFavorite: false,
    },
    {
      id: 8,
      name: 'The Big Bang Theory',
      medium: 'Series',
      category: 'Comedy',
      year: 2007,
      watchedOn: 1578866400000,
      isFavorite: false,
    },
    {
      id: 9,
      name: 'Inception',
      medium: 'Movies',
      category: 'Action',
      year: 2010,
      watchedOn: 1314655200000,
      isFavorite: false,
    },
    {
      id: 10,
      name: 'A Clockwork Orange',
      medium: 'Movies',
      category: 'Drama',
      year: 1971,
      watchedOn: 1097791200000,
      isFavorite: false,
    },
    {
      id: 11,
      name: 'Up',
      medium: 'Movies',
      category: 'Animation',
      year: 2009,
      watchedOn: 1274738400000,
      isFavorite: false,
    },
  ];

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (
            request.urlWithParams.indexOf('mediaitems?medium=') >= 0 ||
            request.url === 'mediaitems'
          ) {
            let medium;
            if (request.urlWithParams.indexOf('?') >= 0) {
              medium = request.urlWithParams.split('=')[1];
              if (medium === 'undefined') {
                medium = '';
              }
            }
            let mediaItems;
            if (medium) {
              mediaItems = this.mediaItems.filter((i) => i.medium === medium);
            } else {
              mediaItems = this.mediaItems;
            }
            responseOptions = {
              body: { mediaItems: JSON.parse(JSON.stringify(mediaItems)) },
              status: 200,
            };
          } else {
            let mediaItems;
            const idToFind = parseInt(request.url.split('/')[1], 10);
            mediaItems = this.mediaItems.filter((i) => i.id === idToFind);
            responseOptions = {
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200,
            };
          }
          break;
        case 'POST':
          const mediaItem = request.body;
          mediaItem.id = this._getNewId();
          this.mediaItems.push(mediaItem);
          responseOptions = { status: 201 };
          break;
        case 'DELETE':
          const id = parseInt(request.url.split('/')[1], 10);
          this._deleteMediaItem(id);
          responseOptions = { status: 200 };
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {};
    });
  }

  _deleteMediaItem(id) {
    const mediaItem = this.mediaItems.find((i) => i.id === id);
    const index = this.mediaItems.indexOf(mediaItem);
    if (index >= 0) {
      this.mediaItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this.mediaItems.length > 0) {
      return (
        Math.max.apply(
          Math,
          this.mediaItems.map((mediaItem) => mediaItem.id)
        ) + 1
      );
    } else {
      return 1;
    }
  }
}
