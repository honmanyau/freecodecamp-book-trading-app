import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BooksActions from '../actions/books';

import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  card: {
    margin: '5px',
    padding: '0',
    display: 'inline-flex',
    justifyContent: 'center'
  },
  cardMedia: {
    height: '200px',
    overflow: 'hidden'
  },
  overlayTitle: {
    fontSize: '10pt',
    lineHeight: '11pt'
  },
  overlaySubtitle: {
    fontSize: '8pt'
  },
  image: {
    width: '128px',
    minWidth: '128px'
  },
  buttonContainer: {
    padding: '0',
    textAlign: 'center'
  }
}

class SearchResult extends React.Component {
  render() {
    const books = this.props.books.searchResult;
    let results = null;

    if (books) {
      const collectionId = this.props.books.collection ? Object.keys(this.props.books.collection) : [];

      results = books.map((book, index) => {
        const info = book.volumeInfo;

        return(
          <Card style={styles.card} containerStyle={{paddingBottom: '0'}} key={index}>
            <CardMedia
              style={styles.cardMedia}
              overlay={
                <CardTitle
                  titleStyle={styles.overlayTitle}
                  subtitleStyle={styles.overlaySubtitle}
                  title={info.title}
                  subtitle={info.authors ? (info.authors.length > 1 ? info.authors[0].slice(0, 18) + " et al." : info.authors[0].slice(0, 22)) : ['Unknown']}
                />
              }
            >
              <img style={styles.image} alt={info.imageLinks ? info.title : 'No image available'} src={info.imageLinks ? info.imageLinks.thumbnail : null} />
            </CardMedia>
            <CardText style={styles.buttonContainer}>
              <FlatButton
                primary
                disabled={collectionId.indexOf(book.id) < 0 ? false : true}
                label={collectionId.indexOf(book.id) < 0 ? 'Add' : 'Added'}
                onClick={() => this.props.actions.addBookToCollection(
                  this.props.auth.user.uid,
                  {
                    [book.id]: {
                      id: book.id,
                      uid: this.props.auth.user.uid,
                      title: info.title,
                      authors: info.authors ? info.authors : ['Unknown'],
                      year: info.publishedDate,
                      imageUrl: info.imageLinks ? info.imageLinks.thumbnail : null,
                      trading: false
                  }
                })}
              />
            </CardText>
          </Card>
        )
      });
    }

    return(
      <div style={styles.container}>
        {results}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(BooksActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
