$(function(){
    $('#lyricsModal').modal({
        keyboard: true,
        backdrop: "static",
        show:false,
        
    }).on('show.bs.modal', function(){
        //  var getIdFromRow = $(event.target).closest('tr').data('id');
        //make your ajax call populate items or what even you need
        //$(this).find('#name').html($('<b> Order Id selected: ' + getIdFromRow  + '</b>'))
        console.log("is this being called");
   
    }).on('hide.bs.modal', function(){
       //   var getIdFromRow = $(event.target).closest('tr').data('id');
        //make your ajax call populate items or what even you need
        //$(this).find('#name').html($('<b> Order Id selected: ' + getIdFromRow  + '</b>'))
        console.log("adfadwf");
    });
});

