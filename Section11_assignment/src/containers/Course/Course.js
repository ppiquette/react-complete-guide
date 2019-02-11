import React, { Component } from 'react';

class Course extends Component {

    getQueryVariable(variable)
    {
           var query = window.location.search.substring(1);
           var vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){
                    let replaced = pair[1].replace(/%20/g, " ");
                    return replaced;
                }
           }
           return(false);
    }

    render () {
        return (
            <div>
                <h1>Title: {this.getQueryVariable("title")}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;