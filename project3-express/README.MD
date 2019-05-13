***ROUTES***
POST /auth/register 	-user can create account
						-body should include the following fields:
							-username
							-password

POST /auth/login		-user can enter login credentials
						-body should include the following fields:
							-username 
							-password
GET /auth/logout		-user can log out of account

GET /lists/newlist		-create a new list
						-body should include the following fields:
							-new list name

GET /lists/{listId} 	-displays albums on the user's list
						-body should include the following fields:
							-search for albums by artist or album title

DELETE /lists/{listId} 	-user can delete any lists they no 														longer want 

GET /user/profile 		-display user's profile and the lists  													they have created
						



***USER STORIES***
-User should be able to enter their login info and submit
-User should be able to register a username and password if they do not have an account
-When user clicks login button they are taken to their account's page that displays a list of their wishlists
-User should be able to search for an artist from their wishlist page 
-User should be able to click 'Delete Album' and delete an album they no longer want on their wishlist
-User clicks on the search button and the search results page are displayed
-User clicks on 'Add Album' and album is added to their wishlist



*** NICE TO HAVES ***





***STRETCH GOALS***


