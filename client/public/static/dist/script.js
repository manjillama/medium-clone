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
}
