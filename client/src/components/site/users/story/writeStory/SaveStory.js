// import { writePost } from 'services/blogService';
//
// const SaveStory = (state) => {
//   let timeout =  0;
//   if(timeout) clearTimeout(timeout);
//
//   timeout = setTimeout(() => {
//     let formData = new FormData();
//     formData.append("title", state.title);
//     formData.append("post", state.post);
//     formData.append("postId", state.postId);
//
//     this.setState({savingState: 'onprogress'});
//     writePost(formData, this.userToken)
//       .then((response) => {
//         this.setState({savingState: 'saved'}, () => {
//           // If post is newly created, id is returned
//           let id = response.data.postId;
//           if(id){
//             this.setState({postId: id}, ()=>{
//               this.props.history.push(`/p/${id}/edit`);
//             });
//           }
//           setTimeout(() => {
//             this.setState({savingState: 'onhold'});
//           }, 1200);
//         });
//
//       });
//   }, 800);
// }
//
// export default
