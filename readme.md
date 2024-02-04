# Structure

This is project is a rtmp server configured using NGINX and Node.js
The NGINX server is receiving the RTMP request and sending to node js to validate the stream key. After the validation the node.js server returns a 200 status and the stream starts.

This rtmp server is configured using HLS to generate the .m3u8 and .ts fragments.
These fragments are being stored in a shared volume (we could change to a shared disk to allow the access of multiple containers). Also the Node.js server is watching the disk looking for new segments, on each new segment the node js server can store them on a cloud storage provider and then delete from disk to clean disk space.