"use strict";
// Expose Internal DOM library
var $$ = Dom7;

// var server = 'http://ereminder.madiunkota.go.id/'; 
// var server = 'http://localhost/ereminder_hamdi/'; // arethusa
var server = 'http://localhost/pemkot_madiun/ereminder/'; //hamdi  
// Init App
var myApp = new Framework7({
    root: '#myApp',
    name: 'ereminder', 
    cache: false,
    id: 'com.company.ereminder',
    modalTitle: "ereminder",
    // Enable Material theme
    material: true,
    onPageInit: function (app, page) {
        if(page.name === "index") {   
            $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>');
            $$('#btnlogout').on('click', function(){
                myApp.closePanel();
                window.localStorage.clear();
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            });
        }
        if (page.name === 'sign-in') {
            myApp.closePanel();
            
            $$('#btnsignin').on('click', function(){
                
                var username = $$('#usernameku').val();
                var password = $$('#password').val();

                // if(email == 'hamdi' && password == '1'){
                //     localStorage.email = 'hamdi';
                //     // myApp.router.navigate('/home/');
                //     mainView.router.load({url: 'home.html', reload: true, ignoreCache: true});
                // } else{
                //     myApp.alert('Invalid username or pass');
                //     // mainView.router.load({url: 'sign-in.html', reload: true, ignoreCache: true});
                // }
                // var x = new FormData($$('.form-login')[0]);
                // //app.dialog.alert(x);
                
                $$.post(server + 'webservice/ws_action_proses_login.php', 
                    {
                        act:'prosesLogin', 
                        username:username, 
                        password:password
                    }, function(data){
                    var obj = JSON.parse(data);
                    // console.log(obj);
                    if(obj[0]['msg'] == 'success'){
                        localStorage.username = username;
                        localStorage.nama = obj[0]['user_name'];
                        mainView.router.load({url: 'kalender_kegiatan.html', reload: true, ignoreCache: true});
                    }
                    else if(obj[0]['msg'] != 'success'){
                        mainView.router.load({url: 'sign-in.html', reload: true, ignoreCache: true});
                        myApp.alert(obj[0]['msg']);
                    }
                });
                
            });
        }
        if(page.name === 'home'){
            if(!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true}); 
                $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>'); 
        }
        if(page.name === 'kalender_kegiatan'){
            if(!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else{
                myApp.closePanel();
                $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>');

                // myApp.OneSignal.setSubscription(true);
                // window.plugins.OneSignal.enableNotificationWhenActive(true);
                var user = localStorage.username;
                // console.log(id_pembuat);

            //---------------CALENDAR LAMA------------------------//
                // $$.post(server + 'loadd.php', 
                //     {user:user}, function(data){
                //     var obj = JSON.parse(data);
                //     // console.log(data);
                //     // var evnts = [];
                    
                //     // for (var i = 0; i < obj.length; i++) {
                //     //     var str_start = new Date(obj[i]['start']);
                //     //     // str_start = new Date().setDate(str_start.getDate() - 1);
                //     //     var obj_start = new Date(str_start).toISOString().slice(0,10);
                //     //     var from = obj_start.replace(/-/g, ", ");

                //     //     var str_end = new Date(obj[i]['end']);
                //     //     // str_end = new Date().setDate(str_end.getDate() - 1);
                //     //     var obj_end = new Date(str_end).toISOString().slice(0,10);
                //     //     var to = obj_end.replace(/-/g, ", ");
                //     //     // console.log(from);   
                //     //     evnts.push({
                //     //         from: from,
                //     //         to: from    
                //     //     });
                //     // }
                //     var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
                //     var calendarInline = myApp.calendar({
                //         container: '#ks-calendar-inline-container',
                //         value: [
                //             new Date()
                //         ],
                //         weekHeader: false,
                //         header: false,
                //         footer: false,
                //         toolbarTemplate: 
                //             '<div class="toolbar calendar-custom-toolbar">' +
                //                 '<div class="toolbar-inner">' +
                //                     '<div class="left">' +
                //                         '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                //                     '</div>' +
                //                     '<div class="center"></div>' +
                //                     '<div class="right">' +
                //                         '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                //                     '</div>' +
                //                 '</div>' +
                //             '</div>',
                //         dateFormat: 'M dd yyyy',
                //         rangesClasses:[],
                //         // events: 
                //         //    evnts
                //         // ,
                //         onOpen: function (p) {
                //             $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                //             $$('.calendar-custom-toolbar .left .link').on('click', function () {
                //                 calendarInline.prevMonth();
                //             });
                //             $$('.calendar-custom-toolbar .right .link').on('click', function () {
                //                 calendarInline.nextMonth();
                //             });
                //             // console.log(p.params.events);
                            
                //             // for (var i = 0; i < start_v.length; i++) {
                //             //     p.params.events.from = new Date(start_v[i]).toISOString();
                //             //     p.params.events.to = new Date(end_v[i]).toISOString();
                //                 // console.log(i);
                //             // }
                //             // $$.each(start_v, function (index, value) {
                //             //     p.params.events.from = value; 
                //             // });

                //             // $$.each(end_v, function (index, value) {
                //             //     p.params.events.to = value; 
                //             // });
                //             // var today = new Date();
                //             //     var weekLater = new Date().setDate(today.getDate() + 7); 
                //             // p.params.events.from = today;
                //             // p.params.events.to = weekLater;

                //             // console.log(p.params.events);
                //             // $$.post(server + '/interface/loadd.php', 
                //             // {}, function(data){
                //             // var obj = JSON.parse(data);
                //             // var str_start;
                //             // var str_end;
                //             // var end;
                //             // var tes;
                //             // for (var i = 0; i < obj.length; i++) {
                //             //     var str_start = new Date(obj[i]['start']);
                //             //     p.params.events.from = str_start;

                //                 // str_start = new Date().setDate(str_start.getDate() - 1);
                //                 // var start = new Date(str_start).toISOString().slice(0,10);

                //                 // var str_end = new Date(obj[i]['end']);
                //                 // p.params.events.to = str_end;
                //                 // start = new Date().setDate(str_start.getDate() - 1);
                //                 // str_end = new Date().setDate(str_end.getDate() - 1);
                //                 // var end = new Date(str_end).toISOString().slice(0,10);
                //                 // // console.log(end);
                //                 // var today = new Date();
                //                 // var weekLater = new Date().setDate(today.getDate() + 7); 
                //             // Inline with custom toolbar
                //                 // console.log(p.params.events.to);
                //             //}
                //             // console.log(str_start, str_end);
                            
                //         // });
                //         },
                //         onMonthYearChangeStart: function (p) {
                //             $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                //         },
                //         onDayClick: function (p, dayContainer, year, month, day){
                //             // console.log(p);
                //             // console.log(year+'-'+(month*1+1)+'-'+day);
                //             $$.post(server + 'webservice/ws_action_check_event.php', 
                //                 {
                //                     tanggal_kegiatan:year+'-'+(month*1+1)+'-'+day 
                //                 }, function(data){
                //                     // alert(data);
                //                     if(data == 0){
                //                         myApp.modal({
                //                             title:  'Tambah Reminder Baru',
                //                             verticalButtons: true,
                //                             buttons: [
                //                               {
                //                                 text: '<p style="text-align: center;">Reminder Umum</p>',
                //                                 onClick: function() {
                //                                     mainView.router.load({url: 'tambah_reminder_umum.html', reload: true, ignoreCache: true});
                //                                 }
                //                               },
                //                               {
                //                                 text: '<p style="text-align: center;">Reminder Khusus</p>',
                //                                 onClick: function() {
                                                  
                //                                 }
                //                               },
                //                               {
                //                                 text: '<p style="text-align: center;">Kembali</p>',
                //                                 onClick: function() {
                //                                     mainView.router.load({url: 'kalender_kegiatan.html', reload: true, ignoreCache: true});  
                //                                 }
                //                               }
                //                             ]
                //                           })
                //                     }
                //                     if(data > 0){
                //                         // console.log(evnts);
                //                         $$.post(server + 'webservice/ws_action_check_event_ada.php', 
                //                             {tanggal_kegiatan:year+'-'+(month*1+1)+'-'+day }, function(data){
                //                                 // alert(data);
                //                                 var obj = JSON.parse(data);
                                                
                //                                 for (var i = 0; i < obj.length; i++) {
                //                                     var obj_mulai = new Date(obj[i]['start']);
                //                                     obj_mulai = new Date(obj_mulai).toISOString().slice(0,10);
                //                                     var obj_selesai = new Date(obj[i]['end']);
                //                                     obj_selesai = new Date(obj_selesai).toISOString().slice(0,10);

                //                                     // var popupHTML = '<div class="popup">'+
                //                                     //                 '<div class="content-block">'+
                //                                     //                   '<p>Popup created dynamically.</p>'+
                //                                     //                   '<p><a href="#" class="close-popup">Close me</a></p>'+
                //                                     //                   '<div class="card">' +
                //                                     //                       '<div class="card-header"><b>'+obj[i]['title']+'</b></div>' +
                //                                     //                       '<div class="card-content">' +
                //                                     //                         '<div class="card-content-inner">'+
                //                                     //                         '<p>Keterangan: '+obj[i]['keterangan']+'</p>'+
                //                                     //                         '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                //                                     //                         '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                //                                     //                         '</div>' +
                //                                     //                       '</div>' +
                //                                     //                     '</div>' +
                //                                     //                 '</div>'+
                //                                     //               '</div>';
                //                                     // myApp.popup(popupHTML);

                //                                      $$('#detail_acara').append(
                //                                         '<div class="card">' +
                //                                           '<div class="card-header"><b>'+obj[i]['title']+'</b></div>' +
                //                                           '<div class="card-content">' +
                //                                             '<div class="card-content-inner">'+
                //                                             '<p>Keterangan: '+obj[i]['keterangan']+'</p>'+
                //                                             '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                //                                             '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                //                                             '</div>' +
                //                                           '</div>' +
                //                                         '</div>'
                //                                     );
                //                                 }
                //                         });                                        
                //                     }
                //                     if(data == 1){
                //                         // console.log(evnts);
                //                         $$.post(server + 'webservice/ws_action_check_event_ada.php', 
                //                             {tanggal_kegiatan:year+'-'+(month*1+1)+'-'+day }, function(data){
                //                                 // alert(data);
                //                                 var obj = JSON.parse(data);
                                                
                //                                 for (var i = 0; i < obj.length; i++) {
                //                                     var obj_mulai = new Date(obj[i]['start']);
                //                                     obj_mulai = new Date(obj_mulai).toISOString().slice(0,10);
                //                                     var obj_selesai = new Date(obj[i]['end']);
                //                                     obj_selesai = new Date(obj_selesai).toISOString().slice(0,10);

                //                                     // var popupHTML = '<div class="popup">'+
                //                                     //                 '<div class="content-block">'+
                //                                     //                   '<p>Popup created dynamically.</p>'+
                //                                     //                   '<p><a href="#" class="close-popup">Close me</a></p>'+
                //                                     //                   '<div class="card">' +
                //                                     //                       '<div class="card-header"><b>'+obj[i]['title']+'</b></div>' +
                //                                     //                       '<div class="card-content">' +
                //                                     //                         '<div class="card-content-inner">'+
                //                                     //                         '<p>Keterangan: '+obj[i]['keterangan']+'</p>'+
                //                                     //                         '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                //                                     //                         '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                //                                     //                         '</div>' +
                //                                     //                       '</div>' +
                //                                     //                     '</div>' +
                //                                     //                 '</div>'+
                //                                     //               '</div>';
                //                                     // myApp.popup(popupHTML);
                //                                      $$('#detail_acara').html(
                //                                         '<div class="card">' +
                //                                           '<div class="card-header"><b>'+obj[i]['title']+'</b></div>' +
                //                                           '<div class="card-content">' +
                //                                             '<div class="card-content-inner">'+
                //                                             '<p>Keterangan: '+obj[i]['keterangan']+'</p>'+
                //                                             '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                //                                             '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                //                                             '</div>' +
                //                                           '</div>' +
                //                                         '</div>'
                //                                     );
                //                                      $$('#detail_acara').html(
                //                                     );
                //                                 }
                //                         });                                        
                //                     }
                //                 });                  
                //         },
                //         onMonthAdd: function (calendar, monthContainer) {
                            
                //             $$(monthContainer).find('.picker-calendar-day').each(function(){
                //                 var day = $$(this);
                //                 var d = new Date();
                //                 var username = localStorage.username;
                //                 var dayDate = day.attr('data-date').split('-');
                //                 // console.log(dayDate[0]+'-'+(dayDate[1]*1+1)+'-'+dayDate[2]);
                //                 // for (var d = new Date(); d <= d; d.setDate(d.getDate() + 1)) {
                //                 //     //daysOfYear.push(new Date(d));
                //                 //     var a = d.getFullYear() + "," + d.getMonth() + "," + d.getDate();
                //                 //     //alert(a);
                //                 //     if(dayDate == a){
                                    
                //                 //     day.html('<div style="position:relative;" data-year="'+
                //                 //     d.getFullYear()+'" data-month="'+ d.getMonth() +'" data-day="'+ d.getDate() +'" ' +
                //                 //     'class="picker-calendar-day" data-date="'+ d.getFullYear()+'-'+d.getMonth() +'-' +d.getDate() +'"><span class=""><p style="line-height:10px;"><font color="red" style="border-radius:50%;background-color:rgb( 255, 242, 103 , 0.7);">'
                //                 //     + d.getDate()+'</font><br /> <font color="blue" style="font-size:10px;">S</font></p></span></div>');
                                    
                //                 //     // day.html('<div class="kalender" data-year="'+
                //                 //     // d.getFullYear()+'" data-month="'+ d.getMonth() +'" data-day="'+ d.getDate() +'" ' +
                //                 //     // 'class="picker-calendar-day" data-date="'+ d.getFullYear()+'-'+d.getMonth() +'-' +d.getDate() +'"><span class=""><p style="line-height:10px;"><font class="day-aktif">'
                //                 //     // + d.getDate()+'</font></p></span></div>');
                //                 //     // day.html('<span><p style="line-height:10px;">'+d.getDate()+'</p><p style="line-height:20px;"><font class="infor" style="color:green;">5</font></p></span>');
                //                 //     }
                //                 // }
                //                  $$.post(server + 'webservice/ws_action_check_event_ada.php', 
                //                             {tanggal_kegiatan:dayDate[0]+'-'+(dayDate[1]*1+1)+'-'+dayDate[2], username: username}, function(data){
                //                                 // alert(data);
                //                                 var obj = JSON.parse(data);
                //                                 // console.log(obj[0]['jml']);
                //                                 if(obj.length == 0){
                //                                     day.html('<span><p style="line-height:10px;">'+dayDate[2]+'</p></span>');
                //                                 }
                //                                 else{
                //                                     day.html('<span><p style="line-height:10px;">'+dayDate[2]+'</p><p style="line-height:10px;"><font class="infor" style="color:green;">'+obj[0]['jml']+'</font></p></span>');
                //                                 }
                                                
                //                         });    
                                
                //             });
                //         } 
                //     });
                    
                // });
            //---------------CALENDAR LAMA------------------------//

                var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
                var calendarInline = myApp.calendar({
                    container: '#ks-calendar-inline-container',
                    value: [
                        new Date()
                    ],
                    weekHeader: false,
                    header: false,
                    footer: false,
                    toolbarTemplate: 
                        '<div class="toolbar calendar-custom-toolbar">' +
                            '<div class="toolbar-inner">' +
                                '<div class="left">' +
                                    '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                                '</div>' +
                                '<div class="center"></div>' +
                                '<div class="right">' +
                                    '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
                    dateFormat: 'M dd yyyy',
                    rangesClasses:[],
                    onOpen: function (p) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                        $$('.calendar-custom-toolbar .left .link').on('click', function () {
                            calendarInline.prevMonth();
                        });
                        $$('.calendar-custom-toolbar .right .link').on('click', function () {
                            calendarInline.nextMonth();
                        });
                    },
                    onMonthYearChangeStart: function (p) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
                    },
                    onDayClick: function (p, dayContainer, year, month, day){
                        var username = localStorage.username;
                        $$.post(server + 'webservice/ws_action_check_event.php', 
                            {
                                tanggal_kegiatan:year+'-'+(month*1+1)+'-'+day
                            }, function(data){
                                console.log(data);
                                if(data == 0){
                                    myApp.modal({
                                        title:  'Tambah Reminder Baru',
                                        verticalButtons: true,
                                        buttons: [
                                          {
                                            text: '<p style="text-align: center;">Reminder Umum</p>',
                                            onClick: function() {
                                                mainView.router.load({url: 'tambah_reminder_umum.html', reload: true, ignoreCache: true});
                                            }
                                          },
                                          {
                                            text: '<p style="text-align: center;">Reminder Khusus</p>',
                                            onClick: function() {
                                              
                                            }
                                          },
                                          {
                                            text: '<p style="text-align: center;">Kembali</p>',
                                            onClick: function() {
                                                mainView.router.load({url: 'kalender_kegiatan.html', reload: true, ignoreCache: true});  
                                            }
                                          }
                                        ]
                                      })
                                }
                                if(data > 0){
                                    // console.log(evnts);
                                    var usename = localStorage.username;
                                    $$.post(server + 'webservice/ws_action_check_event_ada.php', 
                                        {tanggal_kegiatan:year+'-'+(month*1+1)+'-'+day, username: username }, function(data){
                                            // alert(data);
                                        var obj = JSON.parse(data);
                                        console.log(data);
                                        for (var i = 0; i < obj.length; i++) {
                                            var obj_mulai = new Date(obj[i]['start']);
                                            obj_mulai = new Date(obj_mulai).toISOString().slice(0,10);
                                            var obj_selesai = new Date(obj[i]['end']);
                                            obj_selesai = new Date(obj_selesai).toISOString().slice(0,10);

                                            $$('#detail_acara').append(
                                                '<div class="card">' +
                                                  '<div class="card-header"><b>'+obj[i]['title']+'</b></div>' +
                                                  '<div class="card-content">' +
                                                    '<div class="card-content-inner">'+
                                                    '<p>Keterangan: '+obj[i]['keterangan']+'</p>'+
                                                    '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                                                    '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                                                    '</div>' +
                                                  '</div>' +
                                                '</div>'
                                            );
                                        }
                                    });                                        
                                }
                                if(data == 1){
                                    // console.log(evnts);
                                    var usename = localStorage.username;
                                    $$.post(server + 'webservice/ws_action_check_event_ada.php', 
                                        {tanggal_kegiatan:year+'-'+(month*1+1)+'-'+day, username: username }, function(data){
                                            // alert(data);
                                        var obj = JSON.parse(data);
                                        
                                        for (var i = 0; i < obj.length; i++) {
                                            var obj_mulai = new Date(obj[i]['start']);
                                            obj_mulai = new Date(obj_mulai).toISOString().slice(0,10);
                                            var obj_selesai = new Date(obj[i]['end']);
                                            obj_selesai = new Date(obj_selesai).toISOString().slice(0,10);

                                             $$('#detail_acara').html(
                                                '<div class="card">' +
                                                  '<div class="card-header"><b>'+obj[i]['title']+'</b></div>' +
                                                  '<div class="card-content">' +
                                                    '<div class="card-content-inner">'+
                                                    '<p>Keterangan: '+obj[i]['keterangan']+'</p>'+
                                                    '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                                                    '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                                                    '</div>' +
                                                  '</div>' +
                                                '</div>'
                                            );
                                             $$('#detail_acara').html(
                                            );
                                        }
                                    });                                        
                                }
                            });                  
                    },
                    onMonthAdd: function (calendar, monthContainer) {
                        
                        $$(monthContainer).find('.picker-calendar-day').each(function(){
                            var day = $$(this);
                            var d = new Date();
                            var username = localStorage.username;
                            var dayDate = day.attr('data-date').split('-');
                            
                            $$.post(server + 'webservice/ws_action_check_event_ada.php', 
                                {tanggal_kegiatan:dayDate[0]+'-'+(dayDate[1]*1+1)+'-'+dayDate[2], username: username}, function(data){
                                    // alert(data);
                                    var obj = JSON.parse(data);
                                    // console.log(obj[0]['jml']);
                                    if(obj.length == 0){
                                        day.html('<span><p style="line-height:10px;">'+dayDate[2]+'</p></span>');
                                    }
                                    else{
                                        day.html('<span><p style="line-height:10px;">'+dayDate[2]+'</p><b><p style="line-height:10px;"><font class="infor" style="color:green;">'+obj[0]['jml']+'</font></p></b></span>');
                                    }
                                    
                            });    
                            
                        });
                    } 
                });
            }
        }
        if(page.name === 'tambah_reminder_umum'){
            if(!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else{
                myApp.closePanel();
                $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>');
                // myApp.alert(localStorageidUser);
                var calendarDefault1 = myApp.calendar({
                        input: '#ks-calendar-default3',
                    });
                //0 == sekali
                //1 == setiap hari
                // myApp.alert(today.getMonth());
                const namaBulan = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ];
                var today = new Date();
                var tglacara = myApp.picker({
                    input: '#ks-picker-custom-toolbar1',
                    rotateEffect: true,
                    value: [today.getDate(), namaBulan[today.getMonth()], today.getFullYear()],
                    toolbarTemplate: 
                        '<div class="toolbar">' +
                            '<div class="toolbar-inner">' +
                                '<div class="left">' +
                                    '<a href="#" class="link toolbar-randomize-link">Pilih Tanggal Mulai</a>' +
                                '</div>' +
                                '<div class="right">' +
                                    '<a href="#" class="link close-picker">Done</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
                    cols: [
                        {
                            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                        },
                        {
                            
                            values: ('January February March April May June July August September October November December').split(' '),
                            textAlign: 'left'
                        },
                        {
                            values: (function () {
                                var arr = [];
                                for (var i = 1979; i <= 2100; i++) { arr.push(i); }
                                return arr;
                            })(),
                        },
                    ],
                    onOpen: function (picker, values) {
                        // picker.container.find('.toolbar-randomize-link').on('click', function () {
                        //     var col0Values = picker.cols[0].values;
                        //     var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

                        //     var col1Values = picker.cols[1].displayValues;
                        //     var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

                        //     var col2Values = picker.cols[2].values;
                        //     var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
                            
                        //     // picker.setValue([col0Random, col1Values, col2Random]);
                        // });
                    },
                    formatValue: function (p, values, displayValues) {
                        return values[0] + ' '+ values[1] + ' ' + values[2];
                    },
                });

                var jammulai = myApp.picker({
                    input: '#ks-picker-custom-toolbar2',
                    rotateEffect: true,
                    value: [today.getHours(), today.getMinutes()],
                    toolbarTemplate: 
                        '<div class="toolbar">' +
                            '<div class="toolbar-inner">' +
                                '<div class="left">' +
                                    '<a href="#" class="link toolbar-randomize-link">Pilih Waktu Acara</a>' +
                                '</div>' +
                                '<div class="right">' +
                                    '<a href="#" class="link close-picker">Done</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
                    cols: [
                        {
                            values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22',"23"],
                        },
                        {
                            
                            values: (function () {
                                var arr = [];
                                for (var i = 1; i <= 60; i++) { arr.push(i); }
                                return arr;
                            })(),
                        }
                    ],
                    onOpen: function (picker, values) {
                        // picker.container.find('.toolbar-randomize-link').on('click', function () {
                        //     var col0Values = picker.cols[0].values;
                        //     var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

                        //     var col1Values = picker.cols[1].displayValues;
                        //     var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

                        //     var col2Values = picker.cols[2].values;
                        //     var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
                            
                        //     // picker.setValue([col0Random, col1Values, col2Random]);
                        // });
                    },
                    formatValue: function (p, values, displayValues) {
                        return values[0] + ':'+ values[1];
                    },
                });

                var tglsls = myApp.picker({
                    input: '#ks-picker-custom-toolbar3',
                    rotateEffect: true,
                    value: [today.getDate(), namaBulan[today.getMonth()], today.getFullYear()],
                    toolbarTemplate: 
                        '<div class="toolbar">' +
                            '<div class="toolbar-inner">' +
                                '<div class="left">' +
                                    '<a href="#" class="link toolbar-randomize-link">Pilih Tanggal Mulai</a>' +
                                '</div>' +
                                '<div class="right">' +
                                    '<a href="#" class="link close-picker">Done</a>' +
                                '</div>' +
                            '</div>' +
                        '</div>',
                    cols: [
                        {
                            values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                        },
                        {
                            
                            values: ('January February March April May June July August September October November December').split(' '),
                            textAlign: 'left'
                        },
                        {
                            values: (function () {
                                var arr = [];
                                for (var i = 1979; i <= 2100; i++) { arr.push(i); }
                                return arr;
                            })(),
                        },
                    ],
                    onOpen: function (picker, values) {
                        // picker.container.find('.toolbar-randomize-link').on('click', function () {
                        //     var col0Values = picker.cols[0].values;
                        //     var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

                        //     var col1Values = picker.cols[1].displayValues;
                        //     var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

                        //     var col2Values = picker.cols[2].values;
                        //     var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
                            
                        //     // picker.setValue([col0Random, col1Values, col2Random]);
                        // });
                    },
                    formatValue: function (p, values, displayValues) {
                        return values[0] + ' '+ values[1] + ' ' + values[2];
                    },
                });
                    // <select id="kirim" name="kirim">
                    //   <option value="">-- PILIH TIPE KIRIM REMINDER -- </option>
                    //   <option value="2">Pribadi</option> 
                    //   <option value="0">Perorangan</option>
                    //   <option value="1">Grup</option>
                    // </select>
                var pickerKirim = myApp.picker({
                    input: '#ks-picker-device2',
                    cols: [
                        {
                            textAlign: 'center',
                            values: ['Pribadi', 'Perorangan', 'Grup']
                        }
                    ]
                });

                var pickerTipe = myApp.picker({
                    input: '#ks-picker-device3',
                    cols: [
                        {
                            textAlign: 'center',
                            values: ['Sekali', 'Setiap Hari']
                        }
                    ]
                });

                var pickerTipePengingat = myApp.picker({
                    input: '#ks-picker-device4',
                    cols: [
                        {
                            textAlign: 'center',
                            values: ['Setiap Hari Dimulai Tanggal Diingatkan Sampai Hari-H', 'Hanya Tepat Tanggal Diingatkan dan Tepat Hari-H']
                        }
                    ]
                });

                $$('.tipe').on('change', function(){
                    
                    if($$('.tipe').val() == "Sekali"){
                        $$('#tipe_acara_0').show();
                        $$('#tipe_acara_1').hide();
                    }
                    else if($$('.tipe').val() == "Setiap Hari"){  
                        $$('#tipe_acara_0').hide();                      
                        $$('#tipe_acara_1').show();
                    }
                    // myApp.alert($$('#tipe').val());
                });
                
                $$('#btnTambahReminder').on('click', function(){
                    var tgl_acara = $$('.tgl_acara').val() + ' ' + $$('.jam_acara').val();
                    var keterangan = $$('#keterangan').val();
                    var judul = $$('#judul').val(); 
                    var tipe = $$('.tipe').val();
                    var tgl_sls =''; 
                    var ingat ='';
                    var status =''; 
                    var cmbdinas ='';
                    var umum = 'ya';
                    var cmbpegawai = '';
                    var grup = '';
                    var kirim = $$('.kirim').val();
                    var iduser = localStorage.username;
                    // myApp.alert(judul);
                    
                    // console.log(pickerKirim.cols[0].value);
                    var hasil_kirim = '';
                    var ambil_kirim = pickerKirim.cols[0].value;

                    if(ambil_kirim == 'Pribadi'){
                        hasil_kirim = '2';
                    }
                    else if(ambil_kirim == 'Perorangan'){
                        hasil_kirim = '0';
                    }
                    else if(ambil_kirim == 'Grup'){
                        hasil_kirim = '1';
                    }

                    var hasil_tipe = '';
                    var ambil_tipe = pickerTipe.cols[0].value;

                    if(ambil_tipe == 'Sekali'){
                        hasil_tipe = '0';
                    }
                    else if(ambil_tipe == 'Setiap Hari'){
                        hasil_tipe = '1';
                    }

                    var hasil_tipe_pengingat = '';
                    var ambil_tipe_pengingat = pickerTipePengingat.cols[0].value;

                    if(ambil_tipe_pengingat == 'Setiap Hari Dimulai Tanggal Diingatkan Sampai Hari-H'){
                        hasil_tipe_pengingat = '0';
                    }
                    else if(ambil_tipe_pengingat == 'Hanya Tepat Tanggal Diingatkan dan Tepat Hari-H'){
                        hasil_tipe_pengingat = '1';
                    }
                    
                    if(hasil_kirim=='0')
                    {
                        cmbdinas = $$('#cmbdinas').val();
                        cmbpegawai = $$('#cmbpegawai').val(); 
                            if(hasil_tipe=='1')
                            {
                                tgl_sls = $$('.tgl_sls').val() + ' ' + $$('.jam_acara').val();
                                ingat = tgl_acara;
                                status='3';
                            }
                            else if(hasil_tipe=='0')
                            {
                                ingat = $$('#ingat').val();
                                status = hasil_tipe_pengingat
                                tgl_sls=tgl_acara;
                            }
                    }
                    else if(hasil_kirim=='1')
                    {
                        grup = $$('#cmbgrup').val();
                            if(hasil_tipe=='2')
                            {
                                tgl_sls = $$('#bulan_sls').val();
                                ingat = tgl_acara;
                                status = 'bulanan';
                            }
                            else if(hasil_tipe=='1')
                            {
                                tgl_sls = $$('.tgl_sls').val() + ' ' + $('.jam_acara').val();
                                ingat = tgl_acara;
                                status='3';
                            }
                            else if(hasil_tipe=='0') 
                            {
                                ingat = $$('#ingat').val();
                                status = hasil_tipe_pengingat
                                tgl_sls=tgl_acara;
                            }
                    }
                    else
                    { 
                        cmbpegawai = localStorage.username;
                            if(hasil_tipe=='2')
                            {
                                tgl_sls = $$('#bulan_sls').val();
                                ingat = tgl_acara;
                                status = 'bulanan';
                            }
                            else if(hasil_tipe=='1')
                            {
                                tgl_sls = $$('.tgl_sls').val() + ' ' + $$('.jam_acara').val();
                                ingat = tgl_acara;
                                status='3';
                            }
                            else if(hasil_tipe=='0') 
                            {
                                ingat = $$('#ingat').val();
                                status = hasil_tipe_pengingat
                                tgl_sls=tgl_acara;
                            }
                    }
                    // alert(ingat);exit();
                    //alert(tipe+'-'+kirim);exit();
                    // var cmbdinas = $('#cmbdinas').val();
                    // var cmbpegawai = $('#cmbpegawai').val(); 
                    if(hasil_kirim == ''){
                        myApp.alert('Pilih tipe pengiriman Dahulu');
                    } else {
                        $$.post(server + 'webservice/ws_action_simpan_acara.php', 
                        {
                            act: 'submitAcara', 
                            tgl_acara : tgl_acara,
                            keterangan: keterangan,
                            judul: judul,
                            tipe: hasil_tipe,
                            tgl_sls:tgl_sls,
                            ingat:ingat,
                            status:status,
                            umum:umum,
                            cmbdinas:cmbdinas,
                            cmbpegawai:cmbpegawai,
                            grup:grup,
                            kirim:hasil_kirim,
                            iduser:iduser
                        }, 
                        function (data) {
                            //l.stop();    
                             // alert(data);
                            // $$('#pesan').html(data);
                            // console.log(data); 
                            if(data == 'success')
                            { 
                                // swal({
                                //     html: true,
                                //     title: "Reminder Berhasil Ditambah",
                                //     text: "",
                                //     type: "success",     
                                //     confirmButtonColor: "#4CAF50"
                                // },
                                // function(isConfirm){ 
                                //     if(isConfirm){ 
                                //         window.location.replace("index.php"); 
                                //     }
                                // }); 
                                // console.log(data); 
                                myApp.alert("REMINDER BERHASIL DITAMBAH");
                                mainView.router.load({url: 'kalender_kegiatan.html'});
                            }
                            else
                            { 
                              myApp.alert(data);
                            }     
                        });
                    }
                });
            }
        }
        if(page.name === 'reminder_umum_kiriman'){
            if(!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else{
                myApp.closePanel();
                $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>');
                $$.post(server + 'webservice/ws_action_tampil_reminder.php', 
                    {
                        act:'get_reminder',
                        id: localStorage.username
                    }, function(data){
                        // console.log(JSON.parse(data));
                        var obj = JSON.parse(data);
                        for (var i = 0; i < obj.length; i++) {
                            var no = i+1;
                            var obj_mulai = new Date(obj[i]['tanggal_kegiatan']);
                            obj_mulai = new Date(obj_mulai).toISOString().slice(0,10);
                            var obj_selesai = new Date(obj[i]['tanggal_kegiatan_selesai']);
                            obj_selesai = new Date(obj_selesai).toISOString().slice(0,10);
                            
                            $$('#tampil_reminder').append(
                                '<div class="card">' +
                                  '<div class="card-header"><b>'+obj[i]['judul_kegiatan']+'</b></div>' +
                                  '<div class="card-content">' +
                                    '<div class="card-content-inner">'+
                                    '<p>Keterangan: '+obj[i]['keterangan_acara']+'</p>'+
                                    '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                                    '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                                    '</div>' +
                                  '</div>' +
                                  '<div class="card-footer">'+obj[i]['nama']+'</div>' +
                                '</div>'
                                // '<div class="list-block media-list inset">' +
                                //   '<ul>' +
                                //     '<li><a href="#" class="item-link item-content">' +
                                //       '<div class="item-inner">' +
                                //         '<div class="item-title-row">' +
                                //           '<div class="item-title">'+obj[i]['judul_kegiatan']+'</div>' +
                                //         '</div>' +
                                //         '<div class="item-subtitle">'+obj[i]['nama']+'</div>' +
                                //           '<div class="item-text">'+obj[i]['keterangan_acara']+'</div>' +
                                //           '<div class="item-text">Tanggal Mulai Kegiatan: '+obj_mulai+'</div>' +
                                //           '<div class="item-text">Tanggal Selesai Kegiatan: '+obj_selesai+'</div>' +
                                //       '</div>' +
                                //       '</a></li>' +
                                //   '</ul>'
                            // '<div class="data-table">' +
                            //   '<table>' +
                            //     '<thead>' +
                            //       '<tr>' +
                            //         '<th class="label-cell">No</th>' +
                            //         '<th class="label-cell">Nama Kegiatan</th>' +
                            //         '<th class="label-cell">Keterangan Kegiatan</th>' +
                            //         '<th class="label-cell">Tanggal Mulai Kegiatan</th>' +
                            //         '<th class="label-cell">Tanggal Selesai Kegiatan</th>' +
                            //         '<th class="label-cell">Pengirim</th>' +
                            //       '</tr>'+
                            //     '</thead>' +
                            //     '<tbody>' +
                            //       '<tr>' +
                            //         '<td class="label-cell">'+no+'</td>'+
                            //         '<td class="label-cell">'+obj[i]['judul_kegiatan']+'</td>'+
                            //         '<td class="label-cell">'+obj[i]['keterangan_acara']+'</td>'+
                            //         '<td class="label-cell">'+obj[i]['tanggal_kegiatan']+'</td>'+
                            //         '<td class="label-cell">'+obj[i]['tanggal_kegiatan_selesai']+'</td>'+
                            //         '<td class="label-cell">'+obj[i]['nama']+'</td>'+
                            //       '</tr>' +
                            //     '</tbody>' +
                            //   '</table>' +
                            // '</div>'
                            );
                        }
                });
            }
        }
        if(page.name === 'reminder_umum_pribadi'){
            if(!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else{
                myApp.closePanel();
                $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>');
                $$.post(server + 'webservice/ws_action_tampil_reminder.php', 
                    {
                        act:'get_kiriman_reminder',
                        id: localStorage.username
                    }, function(data){
                        // console.log(JSON.parse(data));

                        var obj = JSON.parse(data);
                        for (var i = 0; i < obj.length; i++) {
                            // console.log(obj[i]['id_kegiatan']);
                            var no = i+1;
                            var obj_mulai = new Date(obj[i]['tanggal_kegiatan']);
                            obj_mulai = new Date(obj_mulai).toISOString().slice(0,10);
                            var obj_selesai = new Date(obj[i]['tanggal_kegiatan_selesai']);
                            obj_selesai = new Date(obj_selesai).toISOString().slice(0,10);
                            
                            $$('#tampil_reminder_umum_pribadi').append(
                                '<div class="card">' +
                                '<input type="hidden" id="kegiatan" value='+obj[i]['id_kegiatan']+'>'+
                                  '<div class="card-header"><b>'+obj[i]['judul_kegiatan']+'</b></div>' +
                                  '<div class="card-content">' +
                                    '<div class="card-content-inner">'+
                                    '<p>Keterangan: '+obj[i]['keterangan_acara']+'</p>'+
                                    '<p>Tanggal Mulai Kegiatan: ' +obj_mulai+'</p>'+
                                    '<p>Tanggal Selesai Kegiatan: '+obj_selesai+'</p>'+
                                    '</div>' +
                                  '</div>' +
                                  '<div class="card-footer no-border">' +
                                    '<a href="edit_reminder_umum.html?id='+obj[i]['id_kegiatan']+'" class="link">Edit Reminder</a>' +
                                    '<a href="#" style="color:red;" class="link ac-5">Hapus Reminder</a>'+
                                  '</div>' +
                                '</div>'
                            );
                        }
                        $$('.ac-5').on('click', function () {
                            myApp.modal({
                                title:  'Apakah Anda Yakin?',
                                text: 'Data tidak dapat dikembalikan setelah dihapus',
                                verticalButtons: true,
                                buttons: [
                                  {
                                    text: 'Hapus',
                                    onClick: function() {
                                      var idreminder = $$('#kegiatan').val();
                                        // myApp.alert(idreminder);
                                         $$.post(server + 'webservice/ws_delete.php', 
                                          {
                                            act: 'delete_reminder',
                                            idreminder : idreminder
                                          }, 
                                          function (data) {
                                            myApp.alert("Reminder berhasil dihapus!");
                                            mainView.router.load({url: 'reminder_umum_pribadi.html', reload: true, ignoreCache: true});
                                          });
                                    }
                                  },
                                  {
                                    text: 'Kembali',
                                    onClick: function () {
                                        mainView.router.load({url: 'reminder_umum_pribadi.html', reload: true, ignoreCache: true});
                                    },
                                  }
                                ]
                              })
                            // var buttons = [
                            //     {
                            //         text: 'Edit Reminder',
                            //         onClick: function () {
                            //             myApp.alert('Button1 clicked');
                            //         }
                            //     },
                            //     {
                            //         text: 'Hapus Reminder',
                            //         color: 'red',
                            //         onClick: function () {
                            //             var idreminder = $$('#kegiatan').val();
                            //             // myApp.alert(idreminder);
                            //              $$.post(server + 'webservice/ws_delete.php', 
                            //               {
                            //                   act: 'delete_reminder',
                            //                   idreminder : idreminder
                            //               }, 
                            //               function (data) {
                            //                   myApp.alert("Reminder berhasil dihapus!");
                            //                   mainView.router.load({url: 'reminder_umum_pribadi.html', reload: true, ignoreCache: true});
                            //                 });
                            //         }
                            //     }
                            // ];
                            // myApp.actions(buttons);
                        });   

                });
            }
        }
        if(page.name === 'edit_reminder_umum'){
            if(!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else{
                myApp.closePanel();
                $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>');
                var id_reminder = page.query.id;
                // myApp.alert(type);
                var user = localStorage.username;
                // var template = $$('#template').html();
                // var compiledTemplate = Template7.compile(template);
                $$.post(server + 'webservice/ws_action_edit.php', 
                {
                    act: 'edit_reminder_umum', 
                    id:id_reminder
                }, 
                function (data) {
                    var obj = JSON.parse(data);
                    // var html = compiledTemplate(context);
                    // console.log(context[0]);
                    // console.log(obj);
                    var tanggal_mulai = new Date(obj[0]['tanggal_kegiatan']);
                    tanggal_mulai = new Date(tanggal_mulai).toISOString().slice(0,10);
                    var tanggal_selesai = new Date(obj[0]['tanggal_kegiatan_selesai']);
                    tanggal_selesai = new Date(tanggal_selesai).toISOString().slice(0,10);
                    var jam = new Date(obj[0]['tanggal_kegiatan']);
                    jam = new Date(jam).toISOString().slice(11,19);
                    // console.log(obj_mulai);

                    $$.post(server + 'webservice/ws_action_combodinas.php', 
                    {
                        act: 'get_dinas_umum',
                    }, 
                    function (data) {
                        var obj_combo = JSON.parse(data);
                        var selected = "";
                        console.log(obj_combo[0]);
                        // if(obj_combo[0]['kode_skpd'] == obj[0]['id_dinas']){
                        //        selected = 'selected';
                        //        console.log(obj_combo[0]['kode_skpd']);
                        // }
                        $$('#tampil').html(
                                '<li>' +
                                  '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                      '<div class="item-title  label">Nama Kegiatan</div>' +
                                      '<div class="item-input">' +
                                        '<input type="text" id="judul" name="judul" placeholder="Masukkan nama kegiatan" value="'+obj[0]['judul_kegiatan']+'"/>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</li>' +
                                '<li>' +
                                  '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                      '<div class="item-title  label">Keterangan</div>' +
                                      '<div class="item-input">' +
                                        '<input type="text" id="keterangan" name="keterangan" placeholder="Keterangan kegiatan" value="'+obj[0]['keterangan_acara']+'"/>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</li>' +
                                '<li>' +
                                  '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                      '<div class="item-title  label">Tipe Kirim</div>' +
                                      '<div class="item-input">' +
                                        '<select id="kirim" class="form-control show-tick" name="kirim">'+
                                              
                                        '</select>' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</li>' +
                                '<li>' +
                                  '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                      '<div class="item-title  label">Nama Dinas '+obj[0]['id_dinas']+'</div>' +
                                      '<div class="item-input">'+
                                        '<input type="text" id="ks-picker-device2" class="kirim" placeholder="Pilih Tipe Kirim Reminder"/>'+
                                      '</div>'+
                                    '</div>' +
                                  '</div>'+
                                '</li>'+
                                '<li>'+
                                  '<div class="item-content">'+
                                    '<div class="item-inner">'+
                                      '<div class="item-title  label">Nama Pegawai</div>'+
                                      '<div class="item-input">'+
                                        '<input type="text" id="ks-picker-device2" class="kirim" placeholder="Pilih Tipe Kirim Reminder"/>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>'+
                                '<li>'+
                                    '<div class="item-content">'+
                                      '<div class="item-inner">'+
                                        '<div class="item-title label">Tanggal Mulai</div>'+
                                        '<div class="item-input">'+
                                          '<input type="date" name="tgl" class="tgl_acara" placeholder="Pilih tanggal mulai" id="ks-picker-custom-toolbar1" value="'+tanggal_mulai+'"/>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>'+
                                '</li>'+
                                '<li>'+
                                  '<div class="item-content">'+
                                    '<div class="item-inner">'+
                                      '<div class="item-title  label">Jam</div>'+
                                      '<div class="item-input">'+
                                        '<input type="time" name="jam" id="ks-picker-custom-toolbar2" class="jam_acara" placeholder="Pilih waktu acara" value="'+jam+'"/>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>'+
                                '<li>'+
                                  '<div class="item-content">'+
                                    '<div class="item-inner">'+
                                      '<div class="item-title  label">Tipe Perulangan Acara</div>'+
                                      '<div class="item-input">'+
                                        '<input type="text" id="ks-picker-device3" class="tipe" placeholder="Pilih Tipe Perulangan Acara"/>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>'+
                                '<li>'+
                                  '<div class="item-content">'+
                                    '<div class="item-inner">'+
                                      '<div class="item-title  label">Tanggal Selesai</div>'+
                                      '<div class="item-input">'+
                                        '<input type="date" name="tgl" class="tgl_sls" id="ks-picker-custom-toolbar3" placeholder="Pilih tanggal selesai" value="'+tanggal_selesai+'"/>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'+
                                '</li>'
                    );
                    });
                    
                });
            }
        }
        if(page.name === 'buat_grup_siar'){
            if(!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else{
                myApp.closePanel();
                $$("#username").html('<div class="item-title">'+localStorage.nama+'</div>');
                mainView.router.load({url: 'buat_grup_siar.html', reload: true, ignoreCache: true});
                $$.post(server + 'webservice/ws_action_combodinas.php', 
                    {
                        act:'get_dinas_umum',
                    }, function(data){
                        var obj = JSON.parse(data);
                        // console.log(obj);
                        for (var i = 0; i < obj.length; i++) {
                            // console.log(obj[i]);
                            $$('#combo_dinas').append(
                     '<option value="'+obj[i]['kode_skpd']+'">'+obj[i]['nama_skpd']+'</option>'
                            );

                        }
                        

                });

                var unit_id = "";

                $$('#combo_dinas').on('change', function(){
                    unit_id = $$('#combo_dinas').val();
                    // myApp.alert(unit_id);
                    $$('#tampil_pegawai').show();
                    $$.post(server + 'webservice/ws_action_combopegawai.php', 
                        {
                            act:'get_pegawai_id',
                            unit_id:unit_id
                        }, function(data){
                            var obj = JSON.parse(data);
                            console.log(obj);
                            for (var i = 0; i < obj.length; i++) {
                                // console.log(obj[i]);
                                
                                $$('#combo_pegawai').append(
                         '<option value="'+obj[i]['nip18']+'">'+obj[i]['nama']+'</option>'
                                );

                            }
                            

                    });
                });

                $$('#btnTambahAnggota').on('click', function(){
                    if($$('#nama_grup').val() == ''){
                        myApp.alert('Pilih Dinas Dahulu');
                    }
                    else{
                        var cmbdinas = $$('#combo_dinas').val();
                        var cmbpegawai = $$('#combo_pegawai').val();
                        var code = localStorage.username;
                        // myApp.alert(unit_id);
                        $$('#tampil_pegawai').show();
                        $$.post(server + 'webservice/ws_action_simpan_sementara_grup.php', 
                                {
                                    act:'submitAnggota',
                                    cmbdinas:cmbdinas,
                                    cmbpegawai:cmbpegawai,
                                    code:code
                                }, function(data){
                                    var obj = JSON.parse(data);
                                    console.log(obj);

                                    for (var i = 0; i < obj.length; i++) {
                                        // console.log(obj[i]);
                                        
                                        $$('#combo_pegawai').append(
                                 '<option value="'+obj[i]['nip18']+'">'+obj[i]['nama']+'</option>'
                                        );

                                    }

                        });
                    }
                    
                });
                var cmbdinas = $$('#combo_dinas').val();
                var cmbpegawai = $$('#combo_pegawai').val();
                var code = localStorage.username;
                $$.post(server + 'webservice/ws_action_simpan_sementara_grup.php', 
                        {
                            act:'submitAnggota',
                            cmbdinas:cmbdinas,
                            cmbpegawai:cmbpegawai,
                            code:code
                        }, function(data){
                            var obj = JSON.parse(data);
                            // console.log(obj);

                            for (var i = 0; i < obj.length; i++) {
                                // console.log(obj[i]);
                                
                                $$('#combo_pegawai').append(
                                         '<option value="'+obj[i]['nip18']+'">'+obj[i]['nama']+'</option>'
                                                );
                                                $$('#grup_sementara').append(
                                    '<div class="card">' +
                                      '<div class="card-header"><b>'+obj[i]['nama']+'</b></div>' +
                                      '<div class="card-content">' +
                                        '<div class="card-content-inner">'+
                                        '<p>Kode Dinas: '+obj[i]['nama_skpd']+'</p>'+
                                        '</div>' +
                                      '</div>' +
                                    '</div>'
                                );
                            }
                });
                
                $$('#btnBuatGrup').on('click', function(){
                    if($$('#nama_grup').val() == ''){
                        myApp.alert('Nama Grup Harus Diisi');
                    }
                    else{
                        var nama_grup = $$('#nama_grup').val();
                        var code = localStorage.username;
                        $$.post(server + 'webservice/ws_action_proses_tambah_grup.php', 
                                {
                                    act:'prosesTambahGrup',
                                    nama_grup:nama_grup,
                                    code:code
                                }, function(data){
                                    alert(data);

                        });
                    }
                });                
            }
        }
    }
});

// Add main view
var mainView = myApp.addView('.view-main', {});
if(localStorage.username)
    mainView.router.load({url: 'kalender_kegiatan.html', reload: true, ignoreCache: true});
else{
    mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
}

myApp.onPageInit('calendar todo', function (page) {
    
    
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format',
        dateFormat: 'DD, MM dd, yyyy'
    });
    // With multiple values
    var calendarMultiple = myApp.calendar({
        input: '#ks-calendar-multiple',
        dateFormat: 'M dd yyyy',
        multiple: true
    });

    // var start = new Date().setDate(start.getDate() - 1); 
    // var end = new Date().setDate(end.getDate() - 1); 
    var tet = "";
    // $$.post(server + 'webservice/ws_action_modal_kalender.php', 
    //     {}, function(data){
    //     // var obj = JSON.parse(data);
    //     var str_start;
    //     var str_end;
    //     var end;
    //     var tes;
    //     // for (var i = 0; i < obj.length; i++) {
    //     //     var str_start = new Date(obj[i]['start']);

    //     //     str_start = new Date().setDate(str_start.getDate() - 1);
    //     //     var start = new Date(str_start).toISOString().slice(8,10);

    //     //     var str_end = new Date(obj[i]['end']);
    //     //     // start = new Date().setDate(str_start.getDate() - 1);
    //     //     str_end = new Date().setDate(str_end.getDate() - 1);
    //     //     var end = new Date(str_end).toISOString().slice(0,10);
    //     //     // console.log(end);
    //     //     var today = new Date();
    //     //     var weekLater = new Date().setDate(today.getDate() + 7); 
    //     // Inline with custom toolbar
    //     console.log(data);
        // }
        
        
    // });
    var today = new Date();
    var weekLater = new Date().setDate(today.getDate() + 7); 
    
    

    // var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
    //     var calendarInline = myApp.calendar({
    //         container: '#ks-calendar-inline-container',
    //         value: [
    //             new Date()
    //         ],
    //         weekHeader: false,
    //         header: false,
    //         footer: false,
    //         rangesClasesses: [
    //             $$.post(server + '/interface/loadd.php', 
    //             {}, function(data){
    //             var obj = JSON.parse(data);
    //             var str_start;
    //             var str_end;
    //             var end;
    //             var tes;
    //             for (var i = 0; i < obj.length; i++) {
    //                 var str_start = new Date(obj[i]['start']);

    //                 str_start = new Date().setDate(str_start.getDate() - 1);
    //                 var start = new Date(str_start).toISOString().slice(0,10);

    //                 var str_end = new Date(obj[i]['end']);
    //                 // start = new Date().setDate(str_start.getDate() - 1);
    //                 str_end = new Date().setDate(str_end.getDate() - 1);
    //                 var end = new Date(str_end).toISOString().slice(0,10);
    //                 // console.log(end);
    //                 var today = new Date();
    //                 var weekLater = new Date().setDate(today.getDate() + 7); 
    //             // Inline with custom toolbar
                
    //             }
    //             // console.log(str_start, str_end);
                
    //         })
    //         ],
    //         toolbarTemplate: 
    //             '<div class="toolbar calendar-custom-toolbar">' +
    //                 '<div class="toolbar-inner">' +
    //                     '<div class="left">' +
    //                         '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
    //                     '</div>' +
    //                     '<div class="center"></div>' +
    //                     '<div class="right">' +
    //                         '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
    //                     '</div>' +
    //                 '</div>' +
    //             '</div>',
    //         dateFormat: 'M dd yyyy',
    //         events: {
    //             from: 
                    
    //             ,
    //             to: 
                
    //         },
    //         onOpen: function (p) {
    //             $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    //             $$('.calendar-custom-toolbar .left .link').on('click', function () {
    //                 calendarInline.prevMonth();
    //             });
    //             $$('.calendar-custom-toolbar .right .link').on('click', function () {
    //                 calendarInline.nextMonth();
    //             });
    //             // var today = new Date();
    //             //     var weekLater = new Date().setDate(today.getDate() + 7); 
    //             // p.params.events.from = today;
    //             // p.params.events.to = weekLater;

    //             // console.log(p.params.events);
    //             // $$.post(server + '/interface/loadd.php', 
    //             // {}, function(data){
    //             // var obj = JSON.parse(data);
    //             // var str_start;
    //             // var str_end;
    //             // var end;
    //             // var tes;
    //             // for (var i = 0; i < obj.length; i++) {
    //             //     var str_start = new Date(obj[i]['start']);
    //             //     p.params.events.from = str_start;

    //                 // str_start = new Date().setDate(str_start.getDate() - 1);
    //                 // var start = new Date(str_start).toISOString().slice(0,10);

    //                 // var str_end = new Date(obj[i]['end']);
    //                 // p.params.events.to = str_end;
    //                 // start = new Date().setDate(str_start.getDate() - 1);
    //                 // str_end = new Date().setDate(str_end.getDate() - 1);
    //                 // var end = new Date(str_end).toISOString().slice(0,10);
    //                 // // console.log(end);
    //                 // var today = new Date();
    //                 // var weekLater = new Date().setDate(today.getDate() + 7); 
    //             // Inline with custom toolbar
    //                 // console.log(p.params.events.to);
    //             //}
    //             // console.log(str_start, str_end);
                
    //         // });
    //         },
    //         onMonthYearChangeStart: function (p) {
    //             $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    //         },

    //     });
    // var today = new Date();
    // var weekLater = new Date().setDate(today.getDate() + 7); 
    // // Inline with custom toolbar
    // var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus' , 'September' , 'Oktober', 'November', 'Desember'];
    // var calendarInline = myApp.calendar({
    //     container: '#ks-calendar-inline-container',
    //     value: [new Date()],
    //     weekHeader: false,
    //     header: false,
    //     footer: false,
    //     toolbarTemplate: 
    //         '<div class="toolbar calendar-custom-toolbar">' +
    //             '<div class="toolbar-inner">' +
    //                 '<div class="left">' +
    //                     '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
    //                 '</div>' +
    //                 '<div class="center"></div>' +
    //                 '<div class="right">' +
    //                     '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
    //                 '</div>' +
    //             '</div>' +
    //         '</div>',
    //     dateFormat: 'M dd yyyy',
    //     // events:{ 
    //     //   from:
    //     //   to: 
    //     // },
    //     onOpen: function (p) {
    //         $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    //         $$('.calendar-custom-toolbar .left .link').on('click', function () {
    //             calendarInline.prevMonth();
    //         });
    //         $$('.calendar-custom-toolbar .right .link').on('click', function () {
    //             calendarInline.nextMonth();
    //         });
    //     },
    //     onMonthYearChangeStart: function (p) {
    //         $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
    //     }
    // });
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});


var mySwiper = myApp.swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    pagination:'.swiper-pagination'
});

/* ===== Swipe to delete events callback demo ===== */
myApp.onPageInit('swipe-delete', function (page) {
    $$('.demo-remove-callback').on('deleted', function () {
        myApp.alert('Thanks, item removed!');
    });
    
});


myApp.onPageInit('dashboard', function (page) {
    google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Dinosaur', 'Length'],
          ['Acrocanthosaurus (top-spined lizard)', 12.2],
          ['Albertosaurus (Alberta lizard)', 9.1],
          ['Allosaurus (other lizard)', 12.2],
          ['Apatosaurus (deceptive lizard)', 22.9],
          ['Archaeopteryx (ancient wing)', 0.9],
          ['Argentinosaurus (Argentina lizard)', 36.6],
          ['Baryonyx (heavy claws)', 9.1],
          ['Brachiosaurus (arm lizard)', 30.5],
          ['Ceratosaurus (horned lizard)', 6.1],
          ['Coelophysis (hollow form)', 2.7],
          ['Compsognathus (elegant jaw)', 0.9],
          ['Deinonychus (terrible claw)', 2.7],
          ['Diplodocus (double beam)', 27.1],
          ['Dromicelomimus (emu mimic)', 3.4],
          ['Gallimimus (fowl mimic)', 5.5],
          ['Mamenchisaurus (Mamenchi lizard)', 21.0],
          ['Megalosaurus (big lizard)', 7.9],
          ['Microvenator (small hunter)', 1.2],
          ['Ornithomimus (bird mimic)', 4.6],
          ['Oviraptor (egg robber)', 1.5],
          ['Plateosaurus (flat lizard)', 7.9],
          ['Sauronithoides (narrow-clawed lizard)', 2.0],
          ['Seismosaurus (tremor lizard)', 45.7],
          ['Spinosaurus (spiny lizard)', 12.2],
          ['Supersaurus (super lizard)', 30.5],
          ['Tyrannosaurus (tyrant lizard)', 15.2],
          ['Ultrasaurus (ultra lizard)', 30.5],
          ['Velociraptor (swift robber)', 1.8]]);

        var options = {
          legend: { position: 'none' },
        };

        var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
        
          
        chart.draw(data, options);
          
           var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],               
          ['Sleep',    7]
        ]);

        var options = {
          pieHole: 0.3,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
          
          
      }
});
myApp.onPageInit('swipe-delete media-lists', function (page) {
    $$('.demo-reply').on('click', function () {
        myApp.alert('Reply');
    });
    $$('.demo-mark').on('click', function () {
        myApp.alert('Mark');
    });
    $$('.demo-forward').on('click', function () {
        myApp.alert('Forward');
    });
});


/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('swipe-delete modals media-lists', function (page) {
    var actionSheetButtons = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Choose some action',
                label: true
            },
            // First button
            {
                text: 'Alert',
                onClick: function () {
                    myApp.alert('He Hoou!');
                }
            },
            // Second button
            {
                text: 'Second Alert',
                onClick: function () {
                    myApp.alert('Second Alert!');
                }
            },
            // Another red button
            {
                text: 'Nice Red Button ',
                color: 'red',
                onClick: function () {
                    myApp.alert('You have clicked red button!');
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel'
            }
        ]
    ];
    $$('.demo-actions').on('click', function (e) {
        myApp.actions(actionSheetButtons);
    });
    $$('.demo-actions-popover').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(this, actionSheetButtons);
    });
    
});
        



/* ===== masonary Gallery Page ===== */
myApp.onPageInit('masonry', function (page) {
    $(document).ready( function(){
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
        
    $('.swipebox' ).swipebox();
    
    $(".galleryone").click(function(){
        $(".grid").addClass("one");
        $(".grid").removeClass("two three");
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
    
    $(".gallerytwo").click(function(){
        $(".grid").addClass("two");
        $(".grid").removeClass("one  three");
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
    
    $(".gallerythree").click(function(){
        $(".grid").addClass("three");
        $(".grid").removeClass("two one");
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
    
});







/* ===== Swipebox Gallery Page ===== */

myApp.onPageInit('gallery', function (page) {
        $('.swipebox' ).swipebox();
});



myApp.onPageInit('profile', function (page) {
        $('.swipebox' ).swipebox();
});
        
        
/* ===== Messages Page ===== */
myApp.onPageInit('messages', function (page) {

    var conversationStarted = false;
    var answers = [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!',
    ];
    var people = [
        {
            name: 'Max Johnson',
            avatar: 'img/pic2.png'
        },
        {
            name: 'Stereo Doe',
            avatar: 'img/pic1.png'
        },
        
    ];
    var answerTimeout, isFocused;

    // Initialize Messages
    var myMessages = myApp.messages('.messages');

    // Initialize Messagebar
    var myMessagebar = myApp.messagebar('.messagebar');
    
    $$('.messagebar a.send-message').on('touchstart mousedown', function () {
        isFocused = document.activeElement && document.activeElement === myMessagebar.textarea[0];
    });
    $$('.messagebar a.send-message').on('click', function (e) {
        // Keep focused messagebar's textarea if it was in focus before
        if (isFocused) {
            e.preventDefault();
            myMessagebar.textarea[0].focus();
        }
        var messageText = myMessagebar.value();
        if (messageText.length === 0) {
            return;
        }
        // Clear messagebar
        myMessagebar.clear();

        // Add Message
        myMessages.addMessage({
            text: messageText,
            avatar: 'img/i-f7-material.png',
            type: 'sent',
            date: 'Now'
        });
        conversationStarted = true;
        // Add answer after timeout
        if (answerTimeout) clearTimeout(answerTimeout);
        answerTimeout = setTimeout(function () {
            var answerText = answers[Math.floor(Math.random() * answers.length)];
            var person = people[Math.floor(Math.random() * people.length)];
            myMessages.addMessage({
                text: answers[Math.floor(Math.random() * answers.length)],
                type: 'received',
                name: person.name,
                avatar: person.avatar,
                date: 'Just now'
            });
        }, 2000);
    });
});

/* ===== Pull To Refresh Demo ===== */
myApp.onPageInit('contacts', function (page) {
    // Dummy Content
    var songs = ['Sheela Joshi', 'Boxer Car', 'Makbul Ahemad', 'Lia'];
    var authors = ['India', 'Australia', 'Qatar', 'Clifornia'];
    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
            var picURL = 'img/pic1.png';
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
            var linkHTML = '<li class="item-content">' +
                                '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        '<div class="item-title">' + song + '</div>' +
                                    '</div>' +
                                    '<div class="item-subtitle">' + author + '</div>' +
                                '</div>' +
                            '</li>';
            ptrContent.find('ul').prepend(linkHTML);
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
    });
});




/* ===== Color themes ===== */
myApp.onPageInit('color-themes', function (page) {
    $$(page.container).find('.ks-color-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('theme') === 0) classList.remove(classList[i]);
        }
        classList.add('theme-' + $$(this).attr('data-theme'));
    });
    $$(page.container).find('.ks-layout-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('layout-') === 0) classList.remove(classList[i]);
        }
        classList.add('layout-' + $$(this).attr('data-theme')); 
    });
});


/* ===== Calendar ===== */
myApp.onPageInit('profile todoadd', function (page) {
    // Default
    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default2',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format2',
        dateFormat: 'DD, MM dd, yyyy'
    });
});	

myApp.onPageInit('register', function (page) {
    // Default
    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default2',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format2',
        dateFormat: 'DD, MM dd, yyyy'
    });
});	

/* ===== Pickers ===== */
myApp.onPageInit('pickers', function (page) {
    var today = new Date();

    // iOS Device picker
    var pickerDevice = myApp.picker({
        input: '#ks-picker-device',
        cols: [
            {
                textAlign: 'center',
                values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }
        ]
    });

    // Describe yourself picker
    var pickerDescribe = myApp.picker({
        input: '#ks-picker-describe',
        rotateEffect: true,
        cols: [
            {
                textAlign: 'left',
                values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
            },
            {
                values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
            },
        ]
    });

    // Dependent values
    var carVendors = {
        Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
        German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
        American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
    };
    var pickerDependent = myApp.picker({
        input: '#ks-picker-dependent',
        rotateEffect: true,
        formatValue: function (picker, values) {
            return values[1];
        },
        cols: [
            {
                textAlign: 'left',
                values: ['Japanese', 'German', 'American'],
                onChange: function (picker, country) {
                    if(picker.cols[1].replaceValues){
                        picker.cols[1].replaceValues(carVendors[country]);
                    }
                }
            },
            {
                values: carVendors.Japanese,
                width: 160,
            },
        ]
    });

    

    // Inline date-time
    var pickerInline = myApp.picker({
        input: '#ks-picker-date',
        container: '#ks-picker-date-container',
        rotateEffect: true,
        value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('January February March April May June July August September October November December').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            },
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Space divider
            {
                divider: true,
                content: '&nbsp;&nbsp;'
            },
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }
        ]
    });
});


google.charts.load('current', {'packages':['corechart','geochart','bar','table']});

myApp.onPageInit('chart', function (page) {
    // Load the Visualization API and the corechart package.
     

    $(document).ready( function(){
              google.charts.setOnLoadCallback(drawChart);
                    function drawChart() {
                        
                        /* Donut chart */
                        var data = google.visualization.arrayToDataTable([
                          ['Task', 'Hours per Day'],
                          ['Work',     11],
                          ['Eat',      2],
                          ['Commute',  2],
                          ['Watch TV', 2],
                          ['Sleep',    7]
                      ]);

                     var options = {
                        title: '',
                        pieHole: 0.34
                      };

                      var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                      chart.draw(data, options);
                                 
                     /* Pie chart */
                      var data2 = google.visualization.arrayToDataTable([
                        ['Task', 'Hours per Day'],
                        ['Work',     11],
                        ['Eat',      2],
                        ['Commute',  2],
                        ['Watch TV', 2],
                        ['Sleep',    7]
                        ]);
                      var options2 = {
                        title: ''
                      };

                      var chart2 = new google.visualization.PieChart(document.getElementById('piechart'));

                      chart2.draw(data2, options2);
                    
                          
                      
                        
                        /* bar chart */                      
                        var data3 = google.visualization.arrayToDataTable([
                          ['Year', 'Sales', 'Expenses', 'Profit'],
                          ['2014', 1000, 400, 200],
                          ['2015', 1170, 460, 250],
                          ['2016', 660, 1120, 300],
                          ['2017', 1030, 540, 350]
                        ]);

                        var options3 = {
                          chart: {
                            title: '',
                            subtitle: '',
                          }
                        };
                        var chart3 = new google.charts.Bar(document.getElementById('columnchart_material'));
                        chart3.draw(data3, options3);
      
                        
                        
                        /* tabel chart */
                        var data4 = new google.visualization.DataTable();
                        data4.addColumn('string', 'Name');
                        data4.addColumn('number', 'Salary');
                        data4.addColumn('boolean', 'Full Time Employee');
                        data4.addRows([
                          ['Mike',  {v: 10000, f: '$10,000'}, true],
                          ['Jim',   {v:8000,   f: '$8,000'},  false],
                          ['Alice', {v: 12500, f: '$12,500'}, true],
                          ['Bob',   {v: 7000,  f: '$7,000'},  true]
                        ]);

                        var table = new google.visualization.Table(document.getElementById('table_div'));

                        table.draw(data4, {showRowNumber: true, width: '100%', height: '100%'});
                        
                        
                        
                        /* Area chart */
                      
                        var data5 = google.visualization.arrayToDataTable([
                          ['Year', 'Sales', 'Expenses'],
                          ['2013',  1000,      400],
                          ['2014',  1170,      460],
                          ['2015',  660,       1120],
                          ['2016',  1030,      540]
                        ]);

                        var options5 = {
                          title: '',
                          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
                          vAxis: {minValue: 0}
                        };

                        var chart5 = new google.visualization.AreaChart(document.getElementById('areachart_div'));
                        chart5.draw(data5, options5);
                      
                    
                    
                };
                    
            

              google.charts.setOnLoadCallback(drawRegionsMap);

              function drawRegionsMap() {

                var data = google.visualization.arrayToDataTable([
                  ['Country', 'Popularity'],
                  ['Germany', 200],
                  ['United States', 300],
                  ['Brazil', 400],
                  ['Canada', 500],
                  ['France', 600],
                  ['India', 600],
                  ['RU', 700]
                ]);

                var options = {};

                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                chart.draw(data, options);
              }
  
    
    
    
    
        });
    
    
    
});


function tes(){
     $$.post({url: "https://ekinerja.madiunkota.go.id/hamdiramadhan.php", "rejectUnauthorized": false})
       .on('response', function(response) {
            myApp.alert(response);

       if (response.statusCode === 200) {
         console.log("DONE");
       } else {
         console.log("FAIL");
       }
    });
    // myApp.alert('tes');
    // $$.post('https://ekinerja.madiunkota.go.id/hamdiramadhan.php', 
    //     {
    //         act:'prosesLogin' 
    //     }, function(data){ 
    //         myApp.alert(data);

    // });
} 

/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});



$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});
