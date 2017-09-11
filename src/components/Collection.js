import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as BookActions from '../actions/books';

import { Card, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';



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
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
  }
}

class Collection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openedPopover: null,
      anchorElement: null
    };
  }

  handlePopoverButtonClick(index, target) {
    this.setState({
      openedPopover: index,
      anchorElement: target
    });
  }

  handleRemoveBook(uid, bookId) {
    this.props.actions.removeBookFromCollection(uid, bookId);
    this.resetPopover();
  }

  handleTrade(uid, book, listed) {
    this.props.actions.listBook(uid, book, listed);
    this.resetPopover();
  }

  resetPopover() {
    this.setState({
      openedPopover: null,
      anchorElement: null
    });
  }

  render() {
    const auth = this.props.auth;
    const collectionObj = this.props.books.collection;
    let books = null;

    if (collectionObj) {
      const collection = Object.keys(collectionObj).map((key) => collectionObj[key]);

      books = collection.map((book, index) => {
        return(
          <Card style={styles.card} containerStyle={{padding: '0'}} key={book.id}>
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
            <CardText style={styles.buttonContainer}>
              <FlatButton
                primary={book.trading ? false : true}
                label={book.trading ? '--Listed--' : 'Options'}
                onClick={(event) => this.handlePopoverButtonClick(index, event.currentTarget)}
              />
              <Popover
                open={this.state.openedPopover === index}
                anchorEl={this.state.anchorElement}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={() => this.setState({openedPopover: null})}
              >
                <Menu>
                  {!auth.fetchingProfile && auth.profile ?
                    (
                      book.trading ?
                        (
                          <MenuItem
                            primaryText="Unlist"
                            onClick={() => this.handleTrade(auth.user.uid, book, false)}
                          />
                        )
                        :
                        (
                          <MenuItem
                            primaryText="Trade"
                            onClick={() => this.handleTrade(auth.user.uid, book, true)}
                          />
                        )
                    )
                    :
                    null
                  }
                  <MenuItem
                    primaryText="Remove"
                    onClick={() => this.handleRemoveBook(auth.user.uid, book.id)}
                  />
                </Menu>
              </Popover>
            </CardText>
          </Card>
        )
      });
    }

    return(
      <div>
        {books}
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
    actions: bindActionCreators(BookActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
