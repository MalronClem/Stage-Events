<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log</title>
    <link rel="stylesheet" href="log.css">
</head>
<body>
    <div class="container">
        <div class="move" id="move">
            <div class="log" id="log">
                <form action="">
                        <input class="input" type="email" name="" id="log_email" placeholder="Email">
                        <input class="input"type="password" name="" id="log_mdp" placeholder="Mot de passe">
                        <input class="bouton" type="button" name="" id="log_bouton" value="Se connecter">
                </form>
            </div>
            <div class="sign" id="sign">
                <form action="">
                    <input class="input" type="text" name="" id="sign_nom" placeholder="Nom">
                    <input class="input" type="text" name="" id="sign_prenom" placeholder="Prénom">
                    <input class="input" type="date" name="" id="sign_date" placeholder="Date de naissance">
                    <input class="input" type="email" name="" id="sign_email" placeholder="Email">
                    <input class="input"type="password" name="" id="sign_mdp" placeholder="Mot de passe">
                    <input class="bouton" type="button" name="" id="sign_bouton" value="Se connecter">
                </form>
            </div>
        </div>
        <div class="right">
        <video  id="right_video" autoplay muted loop class="grayscale">
                <source src="../media/3444225-hd_720_1094_25fps.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <div class="text">
                <h1>Vous n'avez pas encore de compte ?</h1>
                <input id="sign_move"class="bouton" type="button" value="S'inscrire">
            </div>
        </div>
        <div class="left">
        <video id="left_video" pause muted loop>
                <source src="../media/3444227-hd_720_1094_25fps (1).mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>

            <div class="text">
                <h1>Vous avez déjà un compte ?</h1>
                <input id="login_move" class="bouton" type="button" value="Se connecter">
            </div>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="log.js"></script>
</html>