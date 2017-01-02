/** jquery loader2 **/
// $(window).load(function(){
//      $("body").queryLoader2({
//             barColor: "#efefef",
//             backgroundColor: "#111",
//             percentage: true,
//             barHeight: 1,
//             minimumTime: 200,
//             fadeOutTime: 1000
//      });
// });

/***preview  image profile ***/
function readURLimg_profile(input) {
    var image_profile = document.querySelector('.txtimage_profile');
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#userimage').attr('src', e.target.result);
            $('.txtimage_profile').attr('value', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#preview_profile_img").change(function(){
    readURLimg_profile(this);
});


/****popup chat****/
            //this function can remove a array element.
            Array.remove = function(array, from, to) {
                var rest = array.slice((to || from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            };
        
            //this variable represents the total number of popups can be displayed according to the viewport width
            var total_popups = 0;
            
            //arrays of popups ids
            var popups = [];
        
            //this is used to close a popup
            function close_popup(id)
            {
                for(var iii = 0; iii < popups.length; iii++)
                {
                    if(id == popups[iii])
                    {
                        Array.remove(popups, iii);
                        
                        document.getElementById(id).style.display = "none";
                        
                        calculate_popups();
                        
                        return;
                    }
                }   
            }
        
            //displays the popups. Displays based on the maximum number of popups that can be displayed on the current viewport width
            function display_popups()
            {
                var right = 220;
                
                var iii = 0;
                for(iii; iii < total_popups; iii++)
                {
                    if(popups[iii] != undefined)
                    {
                        var element = document.getElementById(popups[iii]);
                        element.style.right = right + "px";
                        right = right + 320;
                        element.style.display = "block";
                    }
                }
                
                for(var jjj = iii; jjj < popups.length; jjj++)
                {
                    var element = document.getElementById(popups[jjj]);
                    element.style.display = "none";
                }
            }
            
            //creates markup for a new popup. Adds the id to popups array.
            function register_popup(id, name)
            {
                
                for(var iii = 0; iii < popups.length; iii++)
                {   
                    //already registered. Bring it to front.
                    if(id == popups[iii])
                    {
                        Array.remove(popups, iii);
                    
                        popups.unshift(id);
                        
                        calculate_popups();
                        return;
                    }
                }               
                
                var element = '<div class="popup-box chat-popup" id="'+ id +'">';
                element = element + '<div class="popup-head">';
                element = element + '<div class="popup-head-left">'+ name +'</div>';
                element = element + '<div class="popup-head-right"><a href="javascript:close_popup(\''+ id +'\');">&#10005;</a></div>';
                element = element + '<div style="clear: both"></div></div><div class="popup-messages">';
				element = element + '<p class="message-right"><span>asasaa  sd as as as ee</span> &nbsp;<img src="sas" alt="no img" width="30px" height="30px"/><p>';
				element = element + '<div class="clearfix"></div>';
				element = element + '<p class="message-left"><img src="sas" alt="no img" width="30px" height="30px"/>&nbsp; <span>asasaa  sd as as as ee</span><p></div>';
				element = element + '<div class="input_message"><input type="text"></div></div>';
                
                document.getElementsByTagName("body")[0].innerHTML = document.getElementsByTagName("body")[0].innerHTML + element;  
        
                popups.unshift(id);
                        
                calculate_popups();
                
            }
            
            //calculate the total number of popups suitable and then populate the toatal_popups variable.
            function calculate_popups()
            {
                var width = window.innerWidth;
                if(width < 540)
                {
                    total_popups = 0;
                }
                else
                {
                    width = width - 200;
                    //320 is width of a single popup box
                    total_popups = parseInt(width/320);
                }
                
                display_popups();
                
            }
            
            //recalculate when window is loaded and also when window is resized.
            window.addEventListener("resize", calculate_popups);
            window.addEventListener("load", calculate_popups);
            
/****search****/
$(function () {
  $("#homesearch").autocomplete({
      source: function (request, response) {
         $.ajax({
            url: "/search_member",
            type: "GET",
            data: request,  // request is the value of search input
            success: function (data) {
              // Map response values to fiedl label and value
              response($.map(data, function (el) {
                  return {
                     label: el.user.username+', '+el.user.address,
                     value: el._id
                  };
                  }));
              }
            });
         },
         
         // The minimum number of characters a user must type before a search is performed.
         minLength: 3, 
         
         // set an onFocus event to show the result on input field when result is focused
         focus: function (event, ui) { 
            this.value = ui.item.label; 
            // Prevent other event from not being execute
            event.preventDefault();
         },
         select: function (event, ui) {
            // Prevent value from being put in the input:
            this.value = ui.item.label;
            // Set the id to the next input hidden field
            $(this).next("input").val(ui.item.value); 
            // Prevent other event from not being execute            
            event.preventDefault();
            // optionnal: submit the form after field has been filled up
            $('#quicksearch').submit();
         }
  });

});


//  var socket = io.connect('http://localhost:8080');

//   socket.on('connect', function(){
//     socket.emit('adduser', "<%= user.user.name %>, <%= user.user.address %>");
//   });

//   socket.on('updateusers', function(data) {
//     $('#users').empty();
// var html = '<h2>Friend List</h2> <ul><% for(var i=0; i<friends.length; i++) { %><li><a href="#">'
//     $.each(data, function(key, value) {

// var str = "<%= friends[i] %>";

// if(key =='<%= friends[i] %>') {

// 	if(html.indexOf(str) != -1){
// 		html += '<img src="images/green-dot.png"  >'
// 	}else{
// 		html += '<img src="images/green-dot.png" ><%= friends[i] %>'
// 	}	
//   }else{

// 	if(html.indexOf(str) != -1){
// 		html += ''
// 	}else{
// 		html += '<%= friends[i] %>'
// 	}	
// }
//     });

// 	html +=  '</a></li><% } %> </ul>'


// $('#users').append(html)
//   });
  /***end search***/
/****search box****/
 $(document).ready(function(){
            var submitIcon = $('.searchbox-icon');
            var inputBox = $('.searchbox-input');
            var searchBox = $('.searchbox');
            var isOpen = false;
            submitIcon.click(function(){
                if(isOpen == false){
                    searchBox.addClass('searchbox-open');
                    inputBox.focus();
                  $('.searchbox-input').addClass('displayblock');
                   $('.searchbox-input').removeClass('displaynone');
                   $('.searchbox-icon').css('background','#dcddd8');
                   $('.fa-search').css('color','#000');
                    isOpen = true;
                } else {
                    searchBox.removeClass('searchbox-open');
                    inputBox.focusout();             
                    isOpen = false;
                   $('.searchbox-input').addClass('displaynone');
                   $('.searchbox-input').removeClass('displayblock');
                  $('.searchbox-icon').css('background','transparent');
                   $('.fa-search').css('color','#fff');
                }
            });  
             submitIcon.mouseup(function(){
                    return false;
                });
            searchBox.mouseup(function(){
                    return false;
                });
            $(document).mouseup(function(){
                    if(isOpen == true){
                        $('.searchbox-icon').css('display','block');
                        submitIcon.click();
                    }
                });
        });

            function buttonUp(){
                var inputVal = $('.searchbox-input').val();
                inputVal = $.trim(inputVal).length;
                if( inputVal !== 0){
                 
                } else {
                    $('.searchbox-input').val('');
                    $('.searchbox-icon').css('display','block');
                }
            }


