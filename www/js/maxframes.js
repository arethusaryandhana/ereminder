"use strict";
// Expose Internal DOM library
var $$ = Dom7;

// var server = 'http://ereminder.madiunkota.go.id/'; 
var server = 'http://localhost/ereminder_hamdi/'; // arethusa
// var server = 'http://localhost/pemkot_madiun/ereminder/'; //hamdi  
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
        if (page.name === "index") {
            $$("#username").html('<div class="item-title">' + localStorage.nama + '</div>');
            $$('#btnlogout').on('click', function () {
                myApp.closePanel();
                window.localStorage.clear();
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            });
        }
        if (page.name === 'sign-in') {
            myApp.closePanel();

            $$('#btnsignin').on('click', function () {

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
                        act: 'prosesLogin',
                        username: username,
                        password: password
                    }, function (data) {
                        var obj = JSON.parse(data);
                        // console.log(obj);
                        if (obj[0]['msg'] == 'success') {
                            localStorage.username = username;
                            localStorage.nama = obj[0]['user_name'];
                            localStorage.user_level = obj[0]['user_level'];
                            localStorage.idDinas = obj[0]['idDinas'];
                            mainView.router.load({url: 'kalender_kegiatan.html', reload: true, ignoreCache: true});
                        } else if (obj[0]['msg'] != 'success') {
                            mainView.router.load({url: 'sign-in.html', reload: true, ignoreCache: true});
                            myApp.alert(obj[0]['msg']);
                        }
                    });

            });
        }
        if (page.name === 'home') {
            if (!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            $$("#username").html('<div class="item-title">' + localStorage.nama + '</div>');
        }
        if (page.name === 'kalender_kegiatan') {
            if (!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else {
                myApp.closePanel();

                var user = localStorage.username;
                var username = localStorage.username;
                var nama = localStorage.nama;
                var user_level = localStorage.user_level;
                var idDinas = localStorage.idDinas;
                $$(document).on('deviceready', function() {
                    var notificationOpenedCallback = function(jsonData) {
                    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                  };

                  window.plugins.OneSignal
                    .startInit("a1707a8a-a66a-4025-87d3-7badf7ba0cde")
                    .handleNotificationOpened(notificationOpenedCallback)
                    .endInit(); 
                    window.plugins.OneSignal.setSubscription(true);
                    // window.plugins.OneSignal.enableNotificationWhenActive(true);

                  window.plugins.OneSignal.getIds(function(ids) {
                        myApp.alert("player id: " + ids.userId);
                    });
                }, false);

                $$("#username").html('<div class="item-title">' + nama + '</div>');

                // myApp.OneSignal.setSubscription(true);
                // window.plugins.OneSignal.enableNotificationWhenActive(true);
                // console.log(idDinas); 

                var monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                var calendarInline = myApp.calendar({
                    container: '#ks-calendar-inline-container',
                    value: [
                        '2019-06-01'
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
                    rangesClasses: [],
                    onOpen: function (p) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                        $$('.calendar-custom-toolbar .left .link').on('click', function () {
                            calendarInline.prevMonth();
                        });
                        $$('.calendar-custom-toolbar .right .link').on('click', function () {
                            calendarInline.nextMonth();
                        });
                    },
                    onMonthYearChangeStart: function (p) {
                        $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ', ' + p.currentYear);
                    },
                    onDayClick: function (p, dayContainer, year, month, day) {
                        $$.post(server + 'webservice/ws_action_check_event.php',
                            {
                                tanggal_kegiatan: year + '-' + (month * 1 + 1) + '-' + day
                            }, function (data) {
                                // console.log(data); 
                                if (data > 0) {
                                    // console.log(evnts);
                                    $$('#detail_acara').html('loading...');
                                    $$.post(server + 'webservice/ws_action_check_event_ada.php',
                                        {
                                            tanggal_kegiatan: year + '-' + (month * 1 + 1) + '-' + day
                                            , username: username
                                            , user_level: user_level
                                            , idDinas: idDinas
                                        }, function (data) {
                                            // alert(data);
                                            var obj = JSON.parse(data);
                                            var jml = obj[0]['jml'];
                                            // console.log(obj[0]['query']);
                                            // console.log(data);
                                            $$('#detail_acara').html('');
                                            if(jml != null && jml > 0){  
                                                for (var i = 0; i < obj.length; i++) {
                                                    var obj_mulai = new Date(obj[i]['start']);
                                                    obj_mulai = new Date(obj_mulai).toISOString().slice(0, 10);
                                                    var obj_selesai = new Date(obj[i]['end']);
                                                    obj_selesai = new Date(obj_selesai).toISOString().slice(0, 10);
                                                    $$('#detail_acara').append(
                                                        '<div class="card">' +
                                                        '<div style="color: white; background-color: ' + obj[i]['backgroundColor'] + '" class="card-header">' + (i + 1) + '. <b>' + obj[i]['title'] + '</b></div>' +
                                                        '<div style="color: black" class="card-content">' +
                                                        '<div class="card-content-inner">' +
                                                        '<p>Sumber: <b>' + obj[i]['sumber'] + '</b></p>' +
                                                        '<p>Pembuat Reminder: <b>' + obj[i]['id_pembuat'] + ' - ' + obj[i]['nama_pembuat'] + '</b></p>' +
                                                        '<p>Kepada: <b>' + obj[i]['kepada'] + '</b></p>' +
                                                        '<p>Judul: <b>' + obj[i]['judul_kegiatan'] + '</b></p>' +
                                                        '<p>Keterangan: <b>' + obj[i]['keterangan_acara'] + '</b></p>' +
                                                        '<p>Tanggal: <br><b>' + obj[i]['tanggal_kegiatan'] + ' s/d ' + obj[i]['tanggal_kegiatan_selesai'] + '</b></p>' + 
                                                        '</div>' +
                                                        '</div>' +
                                                        '</div>'
                                                    );
                                                }
                                            }
                                        });
                                }
                            });
                    },
                    onMonthAdd: function (calendar, monthContainer) {

                        $$(monthContainer).find('.picker-calendar-day').each(function () {
                            var day = $$(this);
                            var d = new Date();
                            var dayDate = day.attr('data-date').split('-');

                            var tanggal_kegiatan = dayDate[0] + '-' + (dayDate[1] * 1 + 1) + '-' + dayDate[2];
                            $$.post(server + 'webservice/ws_action_check_event_jumlah.php',
                                {
                                    tanggal_kegiatan: tanggal_kegiatan
                                    , username: username
                                    , user_level: user_level
                                    , idDinas: idDinas
                                }, function (data) {
                                    // alert(data);
                                    var obj = JSON.parse(data);
                                    // console.log(tanggal_kegiatan);
                                    // if(tanggal_kegiatan == '2019-6-1'){ 
                                    // console.log(obj[0]['query']);
                                    // console.log(tanggal_kegiatan);
                                    // console.log('length ' + obj.length);
                                    // for (var i = 0; i < obj.length; i++) { 
                                    //     console.log(obj[i]['backgroundColor']);
                                    //     console.log(obj[i]['jumlah']);
                                    // }
                                    // }
                                    if (obj.length <= 0) {
                                        day.html('<span><p style="line-height:10px;">' + dayDate[2] + '</p></span>');
                                    } else {
                                        var html = `<span>
                                            <p style="line-height:10px;">` + dayDate[2] + `</p>
                                            <b>
                                                <p style="line-height:10px;">`;
                                        for (var i = 0; i < obj.length; i++) {
                                            html += `
                                            <font class="infor" style="color: white;width: 5px;background-color:` + 
                                            obj[i]['backgroundColor'] + `;">` + obj[i]['jumlah'] + `</font>`;
                                        }
                                        html += ` 
                                            </p> 
                                        </b><br>
                                        </span>`;
                                        day.html(html);
                                    }
                            });
                        });
                    }
                });
            }
        }
        if (page.name === 'tambah_reminder_umum') {
            if (!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else {
                myApp.closePanel();
                $$("#username").html('<div class="item-title">' + localStorage.nama + '</div>');
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
                            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                        },
                        {

                            values: ('January February March April May June July August September October November December').split(' '),
                            textAlign: 'left'
                        },
                        {
                            values: (function () {
                                var arr = [];
                                for (var i = 1979; i <= 2100; i++) {
                                    arr.push(i);
                                }
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
                        return values[0] + ' ' + values[1] + ' ' + values[2];
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
                            values: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', "23"],
                        },
                        {

                            values: (function () {
                                var arr = [];
                                for (var i = 1; i <= 60; i++) {
                                    arr.push(i);
                                }
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
                        return values[0] + ':' + values[1];
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
                            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                        },
                        {

                            values: ('January February March April May June July August September October November December').split(' '),
                            textAlign: 'left'
                        },
                        {
                            values: (function () {
                                var arr = [];
                                for (var i = 1979; i <= 2100; i++) {
                                    arr.push(i);
                                }
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
                        return values[0] + ' ' + values[1] + ' ' + values[2];
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

                $$('.tipe').on('change', function () {

                    if ($$('.tipe').val() == "Sekali") {
                        $$('#tipe_acara_0').show();
                        $$('#tipe_acara_1').hide();
                    } else if ($$('.tipe').val() == "Setiap Hari") {
                        $$('#tipe_acara_0').hide();
                        $$('#tipe_acara_1').show();
                    }
                    // myApp.alert($$('#tipe').val());
                });

                $$('#btnTambahReminder').on('click', function () {
                    var tgl_acara = $$('.tgl_acara').val() + ' ' + $$('.jam_acara').val();
                    var keterangan = $$('#keterangan').val();
                    var judul = $$('#judul').val();
                    var tipe = $$('.tipe').val();
                    var tgl_sls = '';
                    var ingat = '';
                    var status = '';
                    var cmbdinas = '';
                    var umum = 'ya';
                    var cmbpegawai = '';
                    var grup = '';
                    var kirim = $$('.kirim').val();
                    var iduser = localStorage.username;
                    // myApp.alert(judul);

                    // console.log(pickerKirim.cols[0].value);
                    var hasil_kirim = '';
                    var ambil_kirim = pickerKirim.cols[0].value;

                    if (ambil_kirim == 'Pribadi') {
                        hasil_kirim = '2';
                    } else if (ambil_kirim == 'Perorangan') {
                        hasil_kirim = '0';
                    } else if (ambil_kirim == 'Grup') {
                        hasil_kirim = '1';
                    }

                    var hasil_tipe = '';
                    var ambil_tipe = pickerTipe.cols[0].value;

                    if (ambil_tipe == 'Sekali') {
                        hasil_tipe = '0';
                    } else if (ambil_tipe == 'Setiap Hari') {
                        hasil_tipe = '1';
                    }

                    var hasil_tipe_pengingat = '';
                    var ambil_tipe_pengingat = pickerTipePengingat.cols[0].value;

                    if (ambil_tipe_pengingat == 'Setiap Hari Dimulai Tanggal Diingatkan Sampai Hari-H') {
                        hasil_tipe_pengingat = '0';
                    } else if (ambil_tipe_pengingat == 'Hanya Tepat Tanggal Diingatkan dan Tepat Hari-H') {
                        hasil_tipe_pengingat = '1';
                    }

                    if (hasil_kirim == '0') {
                        cmbdinas = $$('#cmbdinas').val();
                        cmbpegawai = $$('#cmbpegawai').val();
                        if (hasil_tipe == '1') {
                            tgl_sls = $$('.tgl_sls').val() + ' ' + $$('.jam_acara').val();
                            ingat = tgl_acara;
                            status = '3';
                        } else if (hasil_tipe == '0') {
                            ingat = $$('#ingat').val();
                            status = hasil_tipe_pengingat
                            tgl_sls = tgl_acara;
                        }
                    } else if (hasil_kirim == '1') {
                        grup = $$('#cmbgrup').val();
                        if (hasil_tipe == '2') {
                            tgl_sls = $$('#bulan_sls').val();
                            ingat = tgl_acara;
                            status = 'bulanan';
                        } else if (hasil_tipe == '1') {
                            tgl_sls = $$('.tgl_sls').val() + ' ' + $('.jam_acara').val();
                            ingat = tgl_acara;
                            status = '3';
                        } else if (hasil_tipe == '0') {
                            ingat = $$('#ingat').val();
                            status = hasil_tipe_pengingat
                            tgl_sls = tgl_acara;
                        }
                    } else {
                        cmbpegawai = localStorage.username;
                        if (hasil_tipe == '2') {
                            tgl_sls = $$('#bulan_sls').val();
                            ingat = tgl_acara;
                            status = 'bulanan';
                        } else if (hasil_tipe == '1') {
                            tgl_sls = $$('.tgl_sls').val() + ' ' + $$('.jam_acara').val();
                            ingat = tgl_acara;
                            status = '3';
                        } else if (hasil_tipe == '0') {
                            ingat = $$('#ingat').val();
                            status = hasil_tipe_pengingat
                            tgl_sls = tgl_acara;
                        }
                    }
                    // alert(ingat);exit();
                    //alert(tipe+'-'+kirim);exit();
                    // var cmbdinas = $('#cmbdinas').val();
                    // var cmbpegawai = $('#cmbpegawai').val(); 
                    if (hasil_kirim == '') {
                        myApp.alert('Pilih tipe pengiriman Dahulu');
                    } else {
                        $$.post(server + 'webservice/ws_action_simpan_acara.php',
                            {
                                act: 'submitAcara',
                                tgl_acara: tgl_acara,
                                keterangan: keterangan,
                                judul: judul,
                                tipe: hasil_tipe,
                                tgl_sls: tgl_sls,
                                ingat: ingat,
                                status: status,
                                umum: umum,
                                cmbdinas: cmbdinas,
                                cmbpegawai: cmbpegawai,
                                grup: grup,
                                kirim: hasil_kirim,
                                iduser: iduser
                            },
                            function (data) {
                                //l.stop();    
                                // alert(data);
                                // $$('#pesan').html(data);
                                // console.log(data); 
                                if (data == 'success') {
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
                                } else {
                                    myApp.alert(data);
                                }
                            });
                    }
                });
            }
        }
        if (page.name === 'reminder_umum_kiriman') {
            if (!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else {
                myApp.closePanel();
                $$("#username").html('<div class="item-title">' + localStorage.nama + '</div>');
                $$.post(server + 'webservice/ws_action_tampil_reminder.php',
                    {
                        act: 'get_reminder',
                        id: localStorage.username
                    }, function (data) {
                        // console.log(JSON.parse(data));
                        var obj = JSON.parse(data);
                        if(obj.length == ""){
                            $$('#tampil_reminder').append(
                                '<div class="card">' +
                                '<div class="card-content">' +
                                '<div class="card-content-inner">' +
                                '<p style="text-align: center;"><b>Tidak Ada Reminder</b></p>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                        else{
                            for (var i = 0; i < obj.length; i++) {
                                var obj_mulai = new Date(obj[i]['tanggal_kegiatan']);
                                obj_mulai = new Date(obj_mulai).toISOString().slice(0, 10);
                                var obj_selesai = new Date(obj[i]['tanggal_kegiatan_selesai']);
                                obj_selesai = new Date(obj_selesai).toISOString().slice(0, 10);
                                $$('#tampil_reminder').append(
                                    '<div class="card">' +
                                    '<div class="card-header" style="background-color: #fab1a0; color: white;"><b>' + (i+1) + ". " + obj[i]['judul_kegiatan'] + '</b></div>' +
                                    '<div class="card-content">' +
                                    '<div class="card-content-inner">' +
                                    '<p>Keterangan: <b>' + obj[i]['keterangan_acara'] + '</b></p>' +
                                    '<p>Tanggal Mulai Kegiatan: <b>' + obj_mulai + '</b></p>' +
                                    '<p>Tanggal Selesai Kegiatan: <b>' + obj_selesai + '</b></p>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="card-footer"><b>' + obj[i]['nama'] + '</b></div>' +
                                    '</div>'
                                );
                            }
                        }
                    });
            }
        }
        if (page.name === 'reminder_umum_pribadi') {
            if (!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else {
                myApp.closePanel();
                $$("#username").html('<div class="item-title">' + localStorage.nama + '</div>');
                $$.post(server + 'webservice/ws_action_tampil_reminder.php',
                    {
                        act: 'get_kiriman_reminder',
                        id: localStorage.username
                    }, function (data) {
                        // console.log(JSON.parse(data));

                        var obj = JSON.parse(data);
                        if(obj.length == 0){
                            $$('#tampil_reminder_umum_pribadi').append(
                                '<div class="card">' +
                                '<div class="card-content">' +
                                '<div class="card-content-inner">' +
                                '<p style="text-align: center;"><b>Tidak Ada Reminder</b></p>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                        else{
                            for (var i = 0; i < obj.length; i++) {
                                // console.log(obj[i]['id_kegiatan']);
                                var no = i + 1;
                                var obj_mulai = new Date(obj[i]['tanggal_kegiatan']);
                                obj_mulai = new Date(obj_mulai).toISOString().slice(0, 10);
                                var obj_selesai = new Date(obj[i]['tanggal_kegiatan_selesai']);
                                obj_selesai = new Date(obj_selesai).toISOString().slice(0, 10);

                                $$('#tampil_reminder_umum_pribadi').append(
                                    '<div class="card">' +
                                    '<div class="card-header" style="background-color: #fab1a0; color: white;"><b>' + (i+1) + ". " + obj[i]['judul_kegiatan'] + '</b></div>' +
                                    '<div class="card-header"><b>' + obj[i]['judul_kegiatan'] + '</b></div>' +
                                    '<div class="card-content">' +
                                    '<div class="card-content-inner">' +
                                    '<p>Keterangan: ' + obj[i]['keterangan_acara'] + '</p>' +
                                    '<p>Tanggal Mulai Kegiatan: ' + obj_mulai + '</p>' +
                                    '<p>Tanggal Selesai Kegiatan: ' + obj_selesai + '</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="card-footer no-border">' +
                                    '<a href="edit_reminder_umum.html?id=' + obj[i]['id_kegiatan'] + '" class="link">Edit Reminder</a>' +
                                    '<a href="#" style="color:red;" class="link ac-5">Hapus Reminder</a>' +
                                    '</div>' +
                                    '</div>'
                                );
                            }
                        }
                        $$('.ac-5').on('click', function () {
                            myApp.modal({
                                title: 'Apakah Anda Yakin?',
                                text: 'Data tidak dapat dikembalikan setelah dihapus',
                                verticalButtons: true,
                                buttons: [
                                    {
                                        text: 'Hapus',
                                        onClick: function () {
                                            var idreminder = $$('#kegiatan').val();
                                            // myApp.alert(idreminder);
                                            $$.post(server + 'webservice/ws_delete.php',
                                                {
                                                    act: 'delete_reminder',
                                                    idreminder: idreminder
                                                },
                                                function (data) {
                                                    myApp.alert("Reminder berhasil dihapus!");
                                                    mainView.router.load({
                                                        url: 'reminder_umum_pribadi.html',
                                                        reload: true,
                                                        ignoreCache: true
                                                    });
                                                });
                                        }
                                    },
                                    {
                                        text: 'Kembali',
                                        onClick: function () {
                                            mainView.router.load({
                                                url: 'reminder_umum_pribadi.html',
                                                reload: true,
                                                ignoreCache: true
                                            });
                                        },
                                    }
                                ]
                            })
                        });

                    });
            }
        }
        if (page.name === 'edit_reminder_umum') {
            if (!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else {
                myApp.closePanel();
                $$("#username").html('<div class="item-title">' + localStorage.nama + '</div>');
                var id_reminder = page.query.id;
                // myApp.alert(type);
                var user = localStorage.username;
                // var template = $$('#template').html();
                // var compiledTemplate = Template7.compile(template);
                $$.post(server + 'webservice/ws_action_edit.php',
                    {
                        act: 'edit_reminder_umum',
                        id: id_reminder
                    },
                    function (data) {
                        var obj = JSON.parse(data);
                        // var html = compiledTemplate(context);
                        // console.log(context[0]);
                        // console.log(obj);
                        var tanggal_mulai = new Date(obj[0]['tanggal_kegiatan']);
                        tanggal_mulai = new Date(tanggal_mulai).toISOString().slice(0, 10);
                        var tanggal_selesai = new Date(obj[0]['tanggal_kegiatan_selesai']);
                        tanggal_selesai = new Date(tanggal_selesai).toISOString().slice(0, 10);
                        var jam = new Date(obj[0]['tanggal_kegiatan']);
                        jam = new Date(jam).toISOString().slice(11, 19);
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
                                    '<input type="text" id="judul" name="judul" placeholder="Masukkan nama kegiatan" value="' + obj[0]['judul_kegiatan'] + '"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title  label">Keterangan</div>' +
                                    '<div class="item-input">' +
                                    '<input type="text" id="keterangan" name="keterangan" placeholder="Keterangan kegiatan" value="' + obj[0]['keterangan_acara'] + '"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title  label">Tipe Kirim</div>' +
                                    '<div class="item-input">' +
                                    '<select id="kirim" class="form-control show-tick" name="kirim">' +

                                    '</select>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title  label">Nama Dinas ' + obj[0]['id_dinas'] + '</div>' +
                                    '<div class="item-input">' +
                                    '<input type="text" id="ks-picker-device2" class="kirim" placeholder="Pilih Tipe Kirim Reminder"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title  label">Nama Pegawai</div>' +
                                    '<div class="item-input">' +
                                    '<input type="text" id="ks-picker-device2" class="kirim" placeholder="Pilih Tipe Kirim Reminder"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title label">Tanggal Mulai</div>' +
                                    '<div class="item-input">' +
                                    '<input type="date" name="tgl" class="tgl_acara" placeholder="Pilih tanggal mulai" id="ks-picker-custom-toolbar1" value="' + tanggal_mulai + '"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title  label">Jam</div>' +
                                    '<div class="item-input">' +
                                    '<input type="time" name="jam" id="ks-picker-custom-toolbar2" class="jam_acara" placeholder="Pilih waktu acara" value="' + jam + '"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title  label">Tipe Perulangan Acara</div>' +
                                    '<div class="item-input">' +
                                    '<input type="text" id="ks-picker-device3" class="tipe" placeholder="Pilih Tipe Perulangan Acara"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>' +
                                    '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                    '<div class="item-title  label">Tanggal Selesai</div>' +
                                    '<div class="item-input">' +
                                    '<input type="date" name="tgl" class="tgl_sls" id="ks-picker-custom-toolbar3" placeholder="Pilih tanggal selesai" value="' + tanggal_selesai + '"/>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</li>'
                                );
                            });

                    });
            }
        }
        if (page.name === 'buat_grup_siar') {
            if (!localStorage.username)
                mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
            else {
                myApp.closePanel();
                $$("#username").html('<div class="item-title">' + localStorage.nama + '</div>');
                mainView.router.load({url: 'buat_grup_siar.html', reload: true, ignoreCache: true});
                $$.post(server + 'webservice/ws_action_combodinas.php',
                    {
                        act: 'get_dinas_umum',
                    }, function (data) {
                        var obj = JSON.parse(data);
                        // console.log(obj);
                        for (var i = 0; i < obj.length; i++) {
                            // console.log(obj[i]);
                            $$('#combo_dinas').append(
                                '<option value="' + obj[i]['kode_skpd'] + '">' + obj[i]['nama_skpd'] + '</option>'
                            );

                        }


                    });

                var unit_id = "";

                $$('#combo_dinas').on('change', function () {
                    unit_id = $$('#combo_dinas').val();
                    // myApp.alert(unit_id);
                    $$('#tampil_pegawai').show();
                    $$.post(server + 'webservice/ws_action_combopegawai.php',
                        {
                            act: 'get_pegawai_id',
                            unit_id: unit_id
                        }, function (data) {
                            var obj = JSON.parse(data);
                            console.log(obj);
                            for (var i = 0; i < obj.length; i++) {
                                // console.log(obj[i]);

                                $$('#combo_pegawai').append(
                                    '<option value="' + obj[i]['nip18'] + '">' + obj[i]['nama'] + '</option>'
                                );

                            }


                        });
                });

                $$('#btnTambahAnggota').on('click', function () {
                    if ($$('#nama_grup').val() == '') {
                        myApp.alert('Pilih Dinas Dahulu');
                    } else {
                        var cmbdinas = $$('#combo_dinas').val();
                        var cmbpegawai = $$('#combo_pegawai').val();
                        var code = localStorage.username;
                        // myApp.alert(unit_id);
                        $$('#tampil_pegawai').show();
                        $$.post(server + 'webservice/ws_action_simpan_sementara_grup.php',
                            {
                                act: 'submitAnggota',
                                cmbdinas: cmbdinas,
                                cmbpegawai: cmbpegawai,
                                code: code
                            }, function (data) {
                                var obj = JSON.parse(data);
                                console.log(obj);

                                for (var i = 0; i < obj.length; i++) {
                                    // console.log(obj[i]);

                                    $$('#combo_pegawai').append(
                                        '<option value="' + obj[i]['nip18'] + '">' + obj[i]['nama'] + '</option>'
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
                        act: 'submitAnggota',
                        cmbdinas: cmbdinas,
                        cmbpegawai: cmbpegawai,
                        code: code
                    }, function (data) {
                        var obj = JSON.parse(data);
                        // console.log(obj);

                        for (var i = 0; i < obj.length; i++) {
                            // console.log(obj[i]);

                            $$('#combo_pegawai').append(
                                '<option value="' + obj[i]['nip18'] + '">' + obj[i]['nama'] + '</option>'
                            );
                            $$('#grup_sementara').append(
                                '<div class="card">' +
                                '<div class="card-header"><b>' + obj[i]['nama'] + '</b></div>' +
                                '<div class="card-content">' +
                                '<div class="card-content-inner">' +
                                '<p>Kode Dinas: ' + obj[i]['nama_skpd'] + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</div>'
                            );
                        }
                    });

                $$('#btnBuatGrup').on('click', function () {
                    if ($$('#nama_grup').val() == '') {
                        myApp.alert('Nama Grup Harus Diisi');
                    } else {
                        var nama_grup = $$('#nama_grup').val();
                        var code = localStorage.username;
                        $$.post(server + 'webservice/ws_action_proses_tambah_grup.php',
                            {
                                act: 'prosesTambahGrup',
                                nama_grup: nama_grup,
                                code: code
                            }, function (data) {
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
if (localStorage.username)
    mainView.router.load({url: 'kalender_kegiatan.html', reload: true, ignoreCache: true});
else {
    mainView.router.load({url: 'index.html', reload: true, ignoreCache: true});
}

function tes() {
    $$.post({url: "https://ekinerja.madiunkota.go.id/hamdiramadhan.php", "rejectUnauthorized": false})
        .on('response', function (response) {
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
