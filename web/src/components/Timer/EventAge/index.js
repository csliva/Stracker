// web/src/components/Timer/EventAge -- SIMPLE VIEW -- REPEATABLE
import React, { Component} from 'react';
import distanceInWords from 'date-fns/distance_in_words'

class EventAge extends Component {
  //demands vanilla prop -- insertedAt
  render(){
    if (this.props.insertedAt){
      let dt = distanceInWords(Date.parse(this.props.insertedAt), Date.now())
      return (
        <span className="date">{dt} ago</span>
      );
    }
  else { throw new Error("Component EventAge demands vanilla prop `insertedAt`"); }
<<<<<<< HEAD
  }//end render
=======
  } //end render
>>>>>>> frontend
}

export default EventAge;
