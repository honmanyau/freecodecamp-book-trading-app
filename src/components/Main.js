import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as BookActions from '../actions/books';

import { cyan500 } from 'material-ui/styles/colors';
import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  reminder: {
    fontSize: '14pt',
    textAlign: 'center'
  },
  link: {
    color: cyan500
  },
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
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
  }
};

class Main extends React.Component {
  componentDidMount() {
    this.props.actions.fetchListed();
  }

  render() {
    const auth = this.props.auth;
    const books = this.props.books;
    let listed = null;

    if (!auth.inProgress && books.listed) {
      listed = Object.keys(books.listed).reduce((acc, key) => {
        const book = books.listed[key];

        if (book.listed) {
          acc.push(
            <Card style={styles.card} containerStyle={{paddingBottom: '0'}} key={book.id}>
              <CardMedia
                style={styles.cardMedia}
                overlay={
                  <CardTitle
                    titleStyle={styles.overlayTitle}
                    subtitleStyle={styles.overlaySubtitle}
                    title={book.title}
                    subtitle={book.authors.length > 1 ? book.authors[0].slice(0, 18) + " et al." : book.authors[0].slice(0, 22)}
                  />
                }
              >
                <img style={styles.image} alt={book.imageUrl ? book.title : 'No image available'} src={book.imageUrl ? book.imageUrl : null} />
              </CardMedia>

              {
                auth.user.uid !== book.uid && auth.profile ?
                  <CardText style={styles.buttonContainer}>
                    <FlatButton
                      primary={book.offered ? false : true}
                      secondary={book.offered ? true : false}
                      disabled={book.offered ? (Object.keys(book.offered)[0] === auth.user.uid ? false : true) : false}
                      label={book.offered ? (Object.keys(book.offered)[0] === auth.user.uid ? 'Withdraw' : 'Offered') : 'Offer'}
                      onClick={() => this.props.actions.makeOffer(auth.user.uid, book, !book.offered)}
                    />
                  </CardText>
                  :
                  null
              }
            </Card>
          );
        }

        return acc;
      }, []);
    }

    return(
      <Card>
        {
          !auth.fetchingProfile ?
            (auth.profile ? null : <CardText style={styles.reminder}>You must update <Link style={styles.link} to="/profile">your profile</Link> before you can made a trade offer.  (╯°□°）╯︵ ┻━┻</CardText>)
            :
            null
        }
        <CardText style={styles.container}>
          {
            books.fetchingListed ?
              'Meows are fetching the list for you! (╯°□°）╯︵ ┻━┻'
              :
              (
                listed ? (listed.length > 0 ? listed : 'There are no books listed! (╯°□°）╯︵ ┻━┻') : 'There are no books listed! (╯°□°）╯︵ ┻━┻'
              )
          }
        </CardText>
      </Card>
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
    actions: bindActionCreators(BookActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
