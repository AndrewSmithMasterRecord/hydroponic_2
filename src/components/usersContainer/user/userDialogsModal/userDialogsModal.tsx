import React from "react";
import ReactDOM from "react-dom";



class UserDialogsModal extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.el = document.createElement("div")
  }
 contentContainer:HTMLElement | null = document.getElementById("content");
  el: HTMLDivElement;

  componentDidMount(): void {
    this.el.className = "popup-wrapper";

    if (this.contentContainer) {
      this.contentContainer.appendChild(this.el);
      this.contentContainer.style.overflow = "hidden";
    }

  }
  componentWillUnmount(): void {
    if(this.contentContainer){
      this.contentContainer.removeChild(this.el);
      this.contentContainer.style.overflow = "auto";
    }

  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
export default UserDialogsModal;