# escape=`

#
# Basic Windows node.js image for use as a parent image in the solution.
#

ARG PARENT_IMAGE
FROM $PARENT_IMAGE

ARG NODEJS_VERSION

USER ContainerAdministrator
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
WORKDIR c:\build

RUN Invoke-WebRequest "https://nodejs.org/dist/v$env:NODEJS_VERSION/node-v$env:NODEJS_VERSION-win-x64.zip" -OutFile node.zip
RUN Expand-Archive node.zip -Destination C:\
RUN Move-Item "C:\node-v$env:NODEJS_VERSION-win-x64" c:\node
RUN Remove-Item node.zip

RUN Invoke-WebRequest https://aka.ms/vs/17/release/vc_redist.x64.exe -OutFile vc_redist.x64.exe
RUN Start-Process -FilePath vc_redist.x64.exe -ArgumentList "/install","/quiet","/norestart" -Wait
RUN Remove-Item vc_redist.x64.exe

RUN SETX /M PATH """$env:path;C:\node"""
RUN icacls.exe C:\node\ /grant """Authenticated Users":(F)""" /t
SHELL ["cmd", "/S", "/C"]
USER ContainerUser