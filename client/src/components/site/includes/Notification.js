import React from 'react'

export default class Notification extends React.Component{
  componentDidMount(){
    document.addEventListener('click', this.handleBlur, true);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleBlur, true);
  }

  handleBlur = (e) => {
    let node = document.getElementById('pNotificationPanel');
    let userBtn = document.getElementById('popNotificationPanel');
    let links = node.getElementsByTagName("ul");
    if(node){
      // If user clicks outside the dropdown menu
      if(!node.contains(e.target) && !userBtn.contains(e.target)){
        this.props.hideNotificationbar();
      }else{
        /*
        * If links are clicked
        * setTimeout is so that dropdown gets unvisible only after link is clicked
        */
        if(links[0].contains(e.target)){
          setTimeout(()=>{
            this.props.hideNotificationbar();
          }, 100);
        }
      }
    }
  }

  render(){
    return(
      <div className="popover-userAction usr-n" id="pNotificationPanel">
        <ul>
          <li>No new notifications</li>
        </ul>
      </div>
    );
  }
}
