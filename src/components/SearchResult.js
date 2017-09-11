import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BooksActions from '../actions/books';

import { Card, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
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
    display: 'inline-block',
    display: 'flex',
    justifyContent: 'center'
  },
  cardMedia: {
    height: '220px',
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
      results = books.map((book, index) => {
        const info = book.volumeInfo;
        const authors = info.authors.length > 1 ? info.authors[0].slice(0, 18) + " et al." : info.authors[0].slice(0, 22);

        return(
          <Card style={styles.card} containerStyle={{padding: '0'}} key={book.id}>
            <CardMedia
              style={styles.cardMedia}
              overlay={
                <CardTitle
                  titleStyle={styles.overlayTitle}
                  subtitleStyle={styles.overlaySubtitle}
                  title={info.title}
                  subtitle={authors}
                />
              }
            >
              <img style={styles.image} alt={info.imageLinks ? info.title : 'No image available'} src={info.imageLinks ? info.imageLinks.thumbnail : null} />
            </CardMedia>
            <CardText style={styles.buttonContainer}><FlatButton primary label="Add"/></CardText>
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
    books: state.books
  }
}

export default connect(mapStateToProps, null)(SearchResult);
