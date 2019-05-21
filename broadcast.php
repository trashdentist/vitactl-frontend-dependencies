<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$file = "Vitaline.sock";
$socket = socket_create(AF_UNIX, SOCK_RAW, 0);
socket_sendto($socket, $_GET["msg"], strlen($_GET["msg"]), MSG_EOR, $file, 0);
echo "sent\n";