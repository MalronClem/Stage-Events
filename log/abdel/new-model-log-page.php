<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log</title>
    <link rel="stylesheet" href="new-model-log-page.css">
</head>
<body>
    <br>
<br>
    <div class="cont">
        <div class="form sign-in">
            <h2>Bienvenue</h2>
            <label>
                <span>Email</span>
                <input type="email" />
            </label>
            <label>
                <span>Mot de passe</span>
                <input type="password" />
            </label>
            <p class="forgot-pass">FMot de passe oublié ?</p>
            <button type="button" class="submit">Se Connecter </button>
         
        </div>
        <div class="sub-cont">
            <div class="img">
                <div class="img__text m--up">
                 
                    <h3>Vous n'avez pas de compte, inscrivez vous.<h3>
                </div>
                <div class="img__text m--in">
                
                    <h3>Si vous avez déja un compte, connecter vous.<h3>
                </div>
                <div class="img__btn">
                    <span class="m--up">Se Connecter</span>
                    <span class="m--in">S'Inscrire</span>
                </div>
            </div>
            <div class="form sign-up">
                <h2>Créer un compte</h2>
                <label>
                    <span>Nom utilisateur </span>
                    <input type="text" />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" />
                </label>
                <label>
                  <span> Rôle </span>
                  <select class="input" name="Role" id="role" aria-placeholder=" Selzctez votre role ">
                    <optgroup label=" Selzctez votre role ">
                        <option value="none">  </option>
                        <option value="client"> Client </option>
			            <option value="vendeur"> Prestataire </option>
                    </optgroup>	        
                    </select>
                </label>
                <label>
                    <span>Mot de passe</span>
                    <input type="password" />
                </label>
                <label>
                    <span>Confirmer le mot de passe </span>
                    <input type="password" />
                </label>
                <button type="button" class="submit">S'Inscrire</button>
                
            </div>
        </div>
    </div>
</body>
<script src="log.js"></script>

</html>

