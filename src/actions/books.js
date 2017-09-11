import firebase from '../firebase';



export const FETCHING_COLLECTION = 'FETCHING_COLLECTION';
export const STORE_SEARCH_RESULT = 'STORE_SEARCH_RESULT';
export const STORE_COLLECTION = 'STORE_COLLECTION';
export const STORE_LISTED = 'STORE_LISTED';
export const FETCHING_LISTED = 'FETCHING_LISTED';

export function searchForBooks(bookName) {
  return function(dispatch) {
    // FakePI call for testing
    dispatch(storeSearchResult(sampleResponse.items));
  }
}

export function fetchCollection(uid) {
  return function(dispatch) {
    dispatch(fetchingCollection(true));

    firebase.database().ref(`/book-app/users/${uid}/books`).on('value', (snapshot) => {
        dispatch(storeCollcetion(snapshot.val()));
        dispatch(fetchingCollection(false));
      }, (error) => console.log('Error occured when fetching from collection.'));
  }
}

export function addBookToCollection(uid, book) {
  return function(dispatch) {
    firebase.database().ref(`/book-app/users/${uid}/books`).update(book)
      .catch((error) => console.log('Error occured when attempting to add a book to the collection.'))

  }
}

export function removeBookFromCollection(uid, bookId) {
  return function(dispatch) {
    firebase.database().ref().update({
      [`/book-app/users/${uid}/books/${bookId}`]: null,
      [`/book-app/listed/${uid + bookId}`]: {listed: false, id: bookId}
    })
      .catch((error) => console.log('Error occured when removing a book from the collection.'));
  }
}

export function listBook(uid, book, listed) {
  return function(dispatch) {
    firebase.database().ref().update({
      [`/book-app/users/${uid}/books/${book.id}/trading`]: listed,
      [`/book-app/users/${uid}/books/${book.id}/offered`]: null,
      [`/book-app/listed/${uid + book.id}`]: Object.assign({}, book, {listed, offered: null})
    })
      .catch((error) => console.log('Error occured when listing a book.'));
  }
}

export function fetchListed() {
  return function(dispatch) {
    dispatch(fetchingListed(true));

    firebase.database().ref('/book-app/listed').on('value', (snapshot) => {
      dispatch(storeListed(snapshot.val()));
      dispatch(fetchingListed(false));
    }, (error) => {
      console.log('Error occured while reading listed books.')
    });
  }
}

export function makeOffer(uid, book, offer) {
  return function(dispatch) {
    firebase.database().ref().update({
      [`/book-app/listed/${book.uid + book.id}/offered/${uid}`]: offer ? true : null,
      [`/book-app/users/${book.uid}/books/${book.id}/offered/${uid}`]: offer ? true : null
    })
      .catch((error) => console.log('Error occured when making an offer.'));
  }
}

export function acceptTrade(uid, book, trade) {
  return function(dispatch) {
    firebase.database().ref().update({
      [`/book-app/listed/${book.uid + book.id}/accepted`]: trade,
      [`/book-app/users/${book.uid}/books/${book.id}/accepted`]: trade
    })
      .catch((error) => console.log('Error occured when accepting an offer.'));
  }
}

export function fetchingListed(fetchingListed) {
  return {
    type: FETCHING_LISTED,
    payload: {
      fetchingListed
    }
  }
}

export function fetchingCollection(fetchingCollection) {
  return {
    type: FETCHING_COLLECTION,
    payload: {
      fetchingCollection
    }
  }
}

export function storeSearchResult(searchResult) {
  return {
    type: STORE_SEARCH_RESULT,
    payload: {
      searchResult
    }
  }
}

export function storeCollcetion(collection) {
  return {
    type: STORE_COLLECTION,
    payload: {
      collection
    }
  }
}

export function storeListed(listed) {
  return {
    type: STORE_LISTED,
    payload: {
      listed
    }
  }
}


const sampleResponse = {
 "kind": "books#volumes",
 "totalItems": 49,
 "items": [
  {
   "kind": "books#volume",
   "id": "J38tAwEACAAJ",
   "etag": "bgqB2g6Y3pk",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/J38tAwEACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone",
    "authors": [
     "J. K. Rowling"
    ],
    "publishedDate": "1998",
    "description": "Harry Potter had lived with his aunt, uncle and cousin for ten miserable years, in a cupboard under the stairs. He had been with them ever since his parents were killed in a car crash. When he was younger, Harry dreamed of being rescued but nothing happened - until he is rescued by an owl and taken to Hogwarts School of Witchcraft and Wizardry where he becomes a wizard.",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1855494981"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781855494985"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 223,
    "printType": "BOOK",
    "categories": [
     "Magic"
    ],
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "panelizationSummary": {
     "containsEpubBubbles": false,
     "containsImageBubbles": false
    },
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=J38tAwEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=J38tAwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=J38tAwEACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=1&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=J38tAwEACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=J38tAwEACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=J38tAwEACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Harry Potter had lived with his aunt, uncle and cousin for ten miserable years, in a cupboard under the stairs."
   }
  },
  {
   "kind": "books#volume",
   "id": "39iYWTb6n6cC",
   "etag": "Plt1sMok7MQ",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/39iYWTb6n6cC",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone",
    "authors": [
     "J.K. Rowling"
    ],
    "publisher": "Pottermore",
    "publishedDate": "2015-12-08",
    "description": "\"Turning the envelope over, his hand trembling, Harry saw a purple wax seal bearing a coat of arms; a lion, an eagle, a badger and a snake surrounding a large letter 'H'.\" Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin! Pottermore has now launched the Wizarding World Book Club. Visit Pottermore to sign up and join weekly Twitter discussions at WW Book Club.",
    "industryIdentifiers": [
     {
      "type": "ISBN_13",
      "identifier": "9781781100219"
     },
     {
      "type": "ISBN_10",
      "identifier": "1781100217"
     }
    ],
    "readingModes": {
     "text": true,
     "image": true
    },
    "pageCount": 353,
    "printType": "BOOK",
    "categories": [
     "Juvenile Fiction"
    ],
    "averageRating": 4.5,
    "ratingsCount": 1630,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.16.15.0.preview.3",
    "panelizationSummary": {
     "containsEpubBubbles": false,
     "containsImageBubbles": false
    },
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=39iYWTb6n6cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=39iYWTb6n6cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=39iYWTb6n6cC&printsec=frontcover&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=2&source=gbs_api",
    "infoLink": "https://play.google.com/store/books/details?id=39iYWTb6n6cC&source=gbs_api",
    "canonicalVolumeLink": "https://market.android.com/details?id=book-39iYWTb6n6cC"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "FOR_SALE",
    "isEbook": true,
    "listPrice": {
     "amount": 10.99,
     "currencyCode": "AUD"
    },
    "retailPrice": {
     "amount": 10.99,
     "currencyCode": "AUD"
    },
    "buyLink": "https://play.google.com/store/books/details?id=39iYWTb6n6cC&rdid=book-39iYWTb6n6cC&rdot=1&source=gbs_api",
    "offers": [
     {
      "finskyOfferType": 1,
      "listPrice": {
       "amountInMicros": 1.099E7,
       "currencyCode": "AUD"
      },
      "retailPrice": {
       "amountInMicros": 1.099E7,
       "currencyCode": "AUD"
      },
      "giftable": true
     }
    ]
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "PARTIAL",
    "embeddable": true,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com.au/books/download/Harry_Potter_and_the_Philosopher_s_Stone-sample-epub.acsm?id=39iYWTb6n6cC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "pdf": {
     "isAvailable": true,
     "acsTokenLink": "http://books.google.com.au/books/download/Harry_Potter_and_the_Philosopher_s_Stone-sample-pdf.acsm?id=39iYWTb6n6cC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
    },
    "webReaderLink": "http://play.google.com/books/reader?id=39iYWTb6n6cC&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "SAMPLE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "An incredible adventure is about to begin! Pottermore has now launched the Wizarding World Book Club. Visit Pottermore to sign up and join weekly Twitter discussions at WW Book Club."
   }
  },
  {
   "kind": "books#volume",
   "id": "qpZwAAAACAAJ",
   "etag": "t6TkyFZqxH0",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/qpZwAAAACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone",
    "authors": [
     "R. Keith Whittington"
    ],
    "publisher": "[North Battleford, SK] : Rainbow Horizons Pub.",
    "publishedDate": "2000",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1553190807"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781553190806"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 176,
    "printType": "BOOK",
    "categories": [
     "Fiction"
    ],
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "panelizationSummary": {
     "containsEpubBubbles": false,
     "containsImageBubbles": false
    },
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=qpZwAAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=qpZwAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=qpZwAAAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=3&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=qpZwAAAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=qpZwAAAACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=qpZwAAAACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   }
  },
  {
   "kind": "books#volume",
   "id": "NJbcYgEACAAJ",
   "etag": "vu9lZ2+KPdQ",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/NJbcYgEACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone",
    "subtitle": "Dvd. Cert Pg. 147 Mins. Widescreen",
    "authors": [
     "HARRY."
    ],
    "publishedDate": "2001",
    "industryIdentifiers": [
     {
      "type": "OTHER",
      "identifier": "OCLC:655929829"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=NJbcYgEACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=4&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=NJbcYgEACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=NJbcYgEACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=NJbcYgEACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   }
  },
  {
   "kind": "books#volume",
   "id": "uOoyvgAACAAJ",
   "etag": "MkPK9+0LMiU",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/uOoyvgAACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone - Hufflepuff Edition",
    "authors": [
     "J. K. Rowling"
    ],
    "publisher": "Bloomsbury Childrens",
    "publishedDate": "2017-06",
    "description": "Celebrate 20 years of Harry Potter magic with four special editions ofHarry Potter and the Philosopher's Stone. Gryffindor, Slytherin, Hufflepuff, Ravenclaw ... Twenty years ago these magical words and many more flowed from a young writer's pen, an orphan called Harry Potter was freed from the cupboard under the stairs - and a global phenomenon started.Harry Potter and the Philosopher's Stonehas been read and loved by every new generation since. To mark the 20th anniversary of first publication, Bloomsbury is publishing four House Editions of J.K. Rowling's modern classic. These stunning editions will each feature the individual house crest on the jacket and sprayed edges in the house colours. Exciting new extra content will include fact files, profiles of favourite characters and line illustrations exclusive to that house. Available for a limited period only, these highly collectable editions will be a must-have for all Harry Potter fans in 2017.",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1408883791"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781408883792"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 368,
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "panelizationSummary": {
     "containsEpubBubbles": false,
     "containsImageBubbles": false
    },
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=uOoyvgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=uOoyvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=uOoyvgAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=5&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=uOoyvgAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=uOoyvgAACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=uOoyvgAACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "These stunning editions will each feature the individual house crest on the jacket and line illustrations exclusive to that house, by Kate Greenaway Medal winner Levi Pinfold."
   }
  },
  {
   "kind": "books#volume",
   "id": "ZUAvvgAACAAJ",
   "etag": "uj0RYfwq6zA",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/ZUAvvgAACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone - Ravenclaw Edition",
    "authors": [
     "J. K. Rowling"
    ],
    "publishedDate": "2017-06-01",
    "description": "Celebrate 20 years of Harry Potter magic with four special editions of Harry Potter and the Philosopher's Stone .Gryffindor, Slytherin, Hufflepuff, Ravenclaw ... Twenty years ago these magical words and many more flowed from a young writer's pen, an orphan called Harry Potter was freed from the cupboard under the stairs - and a global phenomenon started. Harry Potter and the Philosopher's Stone has been read and loved by every new generation since. To mark the 20th anniversary of first publication, Bloomsbury is publishing four House Editions of J.K. Rowling's modern classic. These stunning editions will each feature the individual house crest on the jacket and sprayed edges in the house colours. Exciting new extra content will include fact files, profiles of favourite characters and line illustrations exclusive to that house. Available for a limited period only, these highly collectable editions will be a must-have for all Harry Potter fans in 2017.",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1408883783"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781408883785"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 368,
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "panelizationSummary": {
     "containsEpubBubbles": false,
     "containsImageBubbles": false
    },
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=ZUAvvgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=ZUAvvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=ZUAvvgAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=6&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=ZUAvvgAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=ZUAvvgAACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=ZUAvvgAACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "These stunning editions will each feature the individual house crest on the jacket and sprayed edges in the house colours."
   }
  },
  {
   "kind": "books#volume",
   "id": "14jzrQEACAAJ",
   "etag": "EZupLEwT1lc",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/14jzrQEACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone. Illustrated Edition",
    "authors": [
     "J. K. Rowling"
    ],
    "publishedDate": "2015-10-06",
    "description": "Harry Potter lives in a cupboard under the stairs at his Aunt and Uncle's house. He is bullied by them and his spoilt cousin, and lives a very unremarkable life. But then Harry is transported to a world of magic and excitement",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1408845644"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781408845646"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 245,
    "printType": "BOOK",
    "categories": [
     "Children's stories"
    ],
    "averageRating": 3.0,
    "ratingsCount": 1,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "panelizationSummary": {
     "containsEpubBubbles": false,
     "containsImageBubbles": false
    },
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=14jzrQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=14jzrQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=14jzrQEACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=7&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=14jzrQEACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=14jzrQEACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=14jzrQEACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "The landmark publishing event of 2015 -- a full-colour illustrated edition of J.K. Rowling&#39;s Harry Potter and the Philosopher&#39;s Stone with breathtaking illustrations by Jim Kay, winner of the Kate Greenaway medal."
   }
  },
  {
   "kind": "books#volume",
   "id": "O-gmvgAACAAJ",
   "etag": "3Ex+XedzD6k",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/O-gmvgAACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone - Gryffindor Edition",
    "authors": [
     "J. K. Rowling"
    ],
    "publisher": "Bloomsbury Childrens",
    "publishedDate": "2017-06",
    "description": "Celebrate 20 years of Harry Potter magic with four special editions ofHarry Potter and the Philosopher's Stone. Gryffindor, Slytherin, Hufflepuff, Ravenclaw ... Twenty years ago these magical words and many more flowed from a young writer's pen, an orphan called Harry Potter was freed from the cupboard under the stairs - and a global phenomenon started.Harry Potter and the Philosopher's Stonehas been read and loved by every new generation since. To mark the 20th anniversary of first publication, Bloomsbury is publishing four House Editions of J.K. Rowling's modern classic. These stunning editions will each feature the individual house crest on the jacket and sprayed edges in the house colours. Exciting new extra content will include fact files, profiles of favourite characters and line illustrations exclusive to that house. Available for a limited period only, these highly collectable editions will be a must-have for all Harry Potter fans in 2017.",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1408883732"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781408883730"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 368,
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "panelizationSummary": {
     "containsEpubBubbles": false,
     "containsImageBubbles": false
    },
    "imageLinks": {
     "smallThumbnail": "http://books.google.com/books/content?id=O-gmvgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
     "thumbnail": "http://books.google.com/books/content?id=O-gmvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=O-gmvgAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=8&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=O-gmvgAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=O-gmvgAACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=O-gmvgAACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "These stunning editions will each feature the individual house crest on the jacket and line illustrations exclusive to that house, by Kate Greenaway Medal winner Levi Pinfold."
   }
  },
  {
   "kind": "books#volume",
   "id": "qKpcGwAACAAJ",
   "etag": "0ugC62+eWSU",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/qKpcGwAACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone by J.K. Rowling",
    "authors": [
     "Brian Thomas Wesley Way",
     "University of Western Ontario. Faculty of Education"
    ],
    "publishedDate": "2002",
    "industryIdentifiers": [
     {
      "type": "OTHER",
      "identifier": "OCLC:85754697"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "pageCount": 60,
    "printType": "BOOK",
    "categories": [
     "Children's literature"
    ],
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=qKpcGwAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=9&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=qKpcGwAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=qKpcGwAACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=qKpcGwAACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   },
   "searchInfo": {
    "textSnippet": "Grade level: 5, 6, 7, 8, 9, e, i, s, t."
   }
  },
  {
   "kind": "books#volume",
   "id": "Z0_0ygAACAAJ",
   "etag": "b2gRBhGHm40",
   "selfLink": "https://www.googleapis.com/books/v1/volumes/Z0_0ygAACAAJ",
   "volumeInfo": {
    "title": "Harry Potter and the Philosopher's Stone : Novel Study",
    "authors": [
     "Rowling, J. K",
     "Brandon, Cindy",
     "White, Hillary"
    ],
    "publisher": "Barrie, ON : Wintertickle Press",
    "publishedDate": "2002",
    "industryIdentifiers": [
     {
      "type": "ISBN_10",
      "identifier": "1894813308"
     },
     {
      "type": "ISBN_13",
      "identifier": "9781894813303"
     }
    ],
    "readingModes": {
     "text": false,
     "image": false
    },
    "printType": "BOOK",
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": false,
    "contentVersion": "preview-1.0.0",
    "language": "en",
    "previewLink": "http://books.google.com.au/books?id=Z0_0ygAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&cd=10&source=gbs_api",
    "infoLink": "http://books.google.com.au/books?id=Z0_0ygAACAAJ&dq=intitle:%22Harry+Potter+and+the+Philosopher%E2%80%99s+Stone%22&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Philosopher_s_Stone.html?hl=&id=Z0_0ygAACAAJ"
   },
   "saleInfo": {
    "country": "AU",
    "saleability": "NOT_FOR_SALE",
    "isEbook": false
   },
   "accessInfo": {
    "country": "AU",
    "viewability": "NO_PAGES",
    "embeddable": false,
    "publicDomain": false,
    "textToSpeechPermission": "ALLOWED",
    "epub": {
     "isAvailable": false
    },
    "pdf": {
     "isAvailable": false
    },
    "webReaderLink": "http://play.google.com/books/reader?id=Z0_0ygAACAAJ&hl=&printsec=frontcover&source=gbs_api",
    "accessViewStatus": "NONE",
    "quoteSharingAllowed": false
   }
  }
 ]
};
