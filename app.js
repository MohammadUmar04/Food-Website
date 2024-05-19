import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
	apiKey: "AIzaSyAwoZEVEmGkTnI6aKJwZpLsmO0FpD2E5jM",
	authDomain: "foody-website-19ab0.firebaseapp.com",
	projectId: "foody-website-19ab0",
	storageBucket: "foody-website-19ab0.appspot.com",
	messagingSenderId: "256286063809",
	appId: "1:256286063809:web:425baabc6fe8825e0de840",
	measurementId: "G-TMF79XYRD4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
console.log(app);

// Register button event listener
let btn = document.getElementById("register")

if (btn) {

	btn.addEventListener("click", function () {
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;
		//For new registration
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				console.log(user);
				alert("Registration successfully!!");
			})
			.catch((error) => {
				const errorMessage = error.message;
				console.log(errorMessage);
				alert(errorMessage);
			});
	});

}

// Login button event listener


let btn2 = document.getElementById("login")
if (btn2) {

	btn2.addEventListener("click", function () {
		var email = document.getElementById("login_email").value;
		var password = document.getElementById("login_password").value;

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				console.log(user);
				alert(user.email + " Login successfully!!!");
				window.location.href = "./welcome2.html";
			})
			.catch((error) => {
				const errorMessage = error.message;
				console.log(errorMessage);
				alert(errorMessage);
			});
	});

}


// Logout button event listener
let btn3 = document.getElementById("logout")
if (btn3) {

	btn3.addEventListener("click", function () {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log('Sign-out successful.');
				alert('Sign-out successful.');
				// document.getElementById('logout').style.display = 'none';
			})
			.catch((error) => {
				// An error happened.
				console.log('An error happened.');
			});
	});
}



// Logout button event listener
let btn4 = document.getElementById("logoutLink")
if(btn4){

	btn4.addEventListener("click", function () {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log('Sign-out successful.');
				alert('Sign-out successful.');
				// document.getElementById('logout').style.display = 'none';
			})
			.catch((error) => {
				// An error happened.
				console.log('An error happened.');
			});
	});
}


document.addEventListener("DOMContentLoaded", function () {
    const logoutLink = document.getElementById("logoutLink");
    const viewMenuButton = document.getElementById('viewMenuButton');
    const exploreHistoryButton = document.getElementById('exploreHistoryButton');
    const cartItems = document.getElementById('cartItems');
    const checkoutButton = document.getElementById('checkoutButton');
    const checkoutMessage = document.getElementById('checkoutMessage');
    const menuSection = document.getElementById('menuSection');

    if (logoutLink) {
        logoutLink.addEventListener("click", function (event) {
            event.preventDefault();
            signOut(auth).then(() => {
                console.log('User signed out successfully');
                window.location.href = "signin.html";
            }).catch((error) => {
                console.error('Error signing out:', error);
            });
        });
    }

    if (viewMenuButton) {
        viewMenuButton.addEventListener('click', function(event) {
            event.preventDefault();
            menuSection.classList.toggle('open');
        });
    }

    if (exploreHistoryButton) {
        exploreHistoryButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            var historySection = document.getElementById('history');
            if (historySection.style.display === 'none' || historySection.style.display === '') {
                historySection.style.display = 'block'; // Show the history section
                historySection.scrollIntoView({ behavior: 'smooth' }); // Optionally, scroll to the history section
            } else {
                historySection.style.display = 'none'; // Hide the history section
            }
        });
    }

    let itemsAdded = false;

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.previousElementSibling.textContent;
            addItemToCart(menuItem);
        });
    });

    function addItemToCart(item) {
        const li = document.createElement('li');
        li.textContent = item;
        cartItems.appendChild(li);
        itemsAdded = true;
        updateCheckoutMessage();
    }

    checkoutButton.addEventListener('click', () => {
        if (itemsAdded) {
            checkoutMessage.textContent = 'You have successfully added the selected items to your cart.';
        }
    });

    function updateCheckoutMessage() {
        if (itemsAdded) {
            checkoutMessage.textContent = 'The items have been successfully added to your cart.';
        } else {
            checkoutMessage.textContent = '';
        }
    }
});




// onAuthStateChanged(auth, (user) => {
// 	if (user) {

// 	  const logoutLink = document.querySelector(".nav__item.logout");
// 	  logoutLink.style.display = "none"; // Hide Logout link
// 	} else {
// 	  // User is not authenticated
// 	}
//   });



