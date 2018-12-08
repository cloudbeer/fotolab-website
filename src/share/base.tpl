<!DOCTYPE html>
<html lang="{% block lang %}{% endblock %}">

<head>
    <meta charset="utf-8">
    <title>fotolab - {% block pageTilte %}{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="fotolab -  Sharing our passion for film photography.">
    <meta name="author" content="Cloudbeer">
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.slim.min.js"></script>
    <script src="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>

</head>

<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="brand" href="#">fotolab</a>
            <div class="nav-collapse collapse">
                <ul class="nav">
                    <li><a href="about_us.html">{{menu.about_us}}</a></li>
                    <li><a href="services.html">{{menu.services}}</a></li>
                    <li><a href="the_lab.html">{{menu.the_lab}}</a></li>
                    <li><a href="workshops_news.html">{{menu.workshops_news}}</a></li>
                    <li><a href="contact.html">{{menu.contact}}</a></li>
                    <li><a href="lang_switch.html">{{menu.lang_switch}}</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div class="container">
</div>


</html>