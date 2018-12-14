<!DOCTYPE html>
<html lang="{{lang}}">

<head>
    <meta charset="utf-8">
    <title>fotolab - {% block pageTitle %}{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="fotolab -  Sharing our passion for film photography.">
    <meta name="author" content="Cloudbeer">

    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossorigin="anonymous">
    <link href="assets/css/style.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.slim.min.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>

    <style>
        {
                {
                share_styles
            }
        }
    </style>
</head>


<div class="container">

    <div class="nav-scroller py-1 mb-2">
        <nav class="nav d-flex justify-content-between">

            <a class="p-2 pt-4 text-muted" href="about_us.html">{{menu.about_us}}</a>
            <a class="p-2 pt-4 text-muted" href="services.html">{{menu.services}}</a>
            <a class="p-2 pt-4 text-muted" href="the_lab.html">{{menu.the_lab}}</a>
            <a class="text-muted" href="index.html"><img class="fotolab-logo" src="assets/img/logo.png" /></a>
            <a class="p-2 pt-4 text-muted" href="workshops_news.html">{{menu.workshops_news}}</a>
            <a class="p-2 pt-4 text-muted" href="contact.html">{{menu.contact}}</a>
            <a class="p-2 pt-4 text-muted" href="lang_switch.html">{{menu.lang_switch}}</a>
        </nav>
    </div>

    {% block content %}{% endblock %}


    <hr class="footer-line">
    <footer class="fotolab-footer">
        <div class="row flex-nowrap justify-content-between align-items-center align-top">
            <div class="col-4 pt-1">
                <h4>{{footer.contact_title}}</h4>
                <p class="mt-3">{{footer.contact_content}}</p>
                <p class="mt-2">{{footer.member_card}}</p>
            </div>
            <div class="col-4 text-center">
                <h4>{{footer.follow_us}}</h4>
                <p>
                    <i class="fab fa-weixin fa-lg mr-2"></i>
                    <i class="fab fa-instagram fa-lg mr-2"></i>
                    <i class="fab fa-facebook fa-lg"></i>
                </p>
                <p>{{footer.statement}}</p>
            </div>
            <div class="col-4 d-flex justify-content-end align-items-center text-right">
                <p><i class="fas fa-map-marker-alt fa-lg"></i> <br> {{footer.address}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 ">
                <p class="text-center">{{footer.copyright}}</p>
            </div>
        </div>

        <div class="fix-bottom">
            <a class="logo2" href="index.html">{{title2}}</a>
        </div>
    </footer>

</div>


</html>