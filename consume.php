<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$file = "Vitaline.sock";
unlink($file);

$socket = socket_create(AF_UNIX, SOCK_RAW, 0);
socket_bind($socket, $file);
socket_recvfrom($socket, $buf, 64 * 1024, 0, $source);

echo "received: " . $buf . "\n";