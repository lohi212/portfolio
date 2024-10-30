<?php

// Replace this with your own email address
$siteOwnersEmail = 'suvvarilohita@gmail.com';

if ($_POST) {

    $name = trim(stripslashes($_POST['contactName']));
    $email = trim(stripslashes($_POST['contactEmail']));
    $subject = trim(stripslashes($_POST['contactSubject']));
    $contact_message = trim(stripslashes($_POST['contactMessage']));

    $error = []; // Initialize error array

    // Check Name
    if (strlen($name) < 2) {
        $error['name'] = "Please enter your name.";
    }

    // Check Email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error['email'] = "Please enter a valid email address.";
    }

    // Check Message
    if (strlen($contact_message) < 15) {
        $error['message'] = "Please enter your message. It should have at least 15 characters.";
    }

    // Default Subject if Empty
    if (empty($subject)) { 
        $subject = "Contact Form Submission"; 
    }

    // Set Message with Additional Security against HTML Injection
    $message = "Email from: " . htmlspecialchars($name) . "<br />";
    $message .= "Email address: " . htmlspecialchars($email) . "<br />";
    $message .= "Message: <br />";
    $message .= nl2br(htmlspecialchars($contact_message));
    $message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";

    // Set From Header
    $from = htmlspecialchars($name) . " <" . htmlspecialchars($email) . ">";

    // Email Headers
    $headers = "From: " . $from . "\r\n";
    $headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // Send Email if No Errors
    if (empty($error)) {
        ini_set("sendmail_from", $siteOwnersEmail); // For Windows server
        $mail = mail($siteOwnersEmail, $subject, $message, $headers);

        if ($mail) {
            echo "OK";
        } else {
            echo "Something went wrong. Please try again.";
        }
    } else {
        // Return Validation Errors
        $response = (isset($error['name'])) ? $error['name'] . "<br /> \n" : '';
        $response .= (isset($error['email'])) ? $error['email'] . "<br /> \n" : '';
        $response .= (isset($error['message'])) ? $error['message'] . "<br />" : '';

        echo $response;
    }
}
?>
