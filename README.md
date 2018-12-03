# NodeJS and AWS S3 test

To run this app you need to do the following:
- Create IAM user.
- Create AWS credentials shared file to be used by SDK. The file is created in:
  * Linux, Unix, and macOS users:`~/.aws/credentials`    
  * Windows users:`C:\Users\USER_NAME\.aws\credentials`
  
  The file needs to have the following content:
```
[default]
aws_access_key_id = <YOUR_ACCESS_KEY_ID>
aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>
```