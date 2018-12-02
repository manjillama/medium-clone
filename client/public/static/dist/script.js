window.onload=function(){

  /*
  * Nav menu user drop down logic
  */
  (function showUserMenuLogic(){
    var popoverBtn = document.getElementById("popUserPanel");
    // If button exist
    if(popoverBtn){
      var pUserActionPanel = document.getElementById("pUserActionPanel");
      var userDropDown = document.getElementById("pUserActionPanel");
      document.addEventListener("click", function(e){
        /*
        * Triggering Hiding user menu dropdown when click on document
        * Not triggered if clicked on toggle button or the dropdown itself.
        */
        if(e.target !== userDropDown && e.target !== popoverBtn){
          pUserActionPanel.style.display = "none";
        }
      });
      /*
      Toggling user menu dropdown
      */
      popoverBtn.addEventListener("click", function(){
        if (pUserActionPanel.style.display === "none") {
          pUserActionPanel.style.display = "block";
        } else {
          pUserActionPanel.style.display = "none";
        }
      });
    }
  })();

  (function showLoginModal(){
    let loginModal = document.getElementById('loginModalWrapper');
    if(loginModal){
      let loginModalBtn = document.getElementById('loginModalBtn');
      loginModalBtn.addEventListener("click", function(){
        loginModal.style.display = "block";
      })

      let modalWrapper = document.getElementsByClassName('modal')[0];

      modalWrapper.addEventListener("click", function(e){
        handleBlur(e);
      })

      function handleBlur(e){
        let modalContent = document.getElementsByClassName('modal-dialog')[0];
        if(modalContent.contains(e.target)){
          // Check for close button
          let closeBtn = document.getElementsByClassName('closeModal')[0];
          if(closeBtn.contains(e.target)){
            loginModal.style.display = "none";
          }
        }else{
          loginModal.style.display = "none";
        }
      }
    }
  })();
}
