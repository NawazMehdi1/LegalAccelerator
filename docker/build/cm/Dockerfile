# escape=`

ARG PARENT_IMAGE
ARG SOLUTION_IMAGE
ARG TOOLS_IMAGE

FROM ${TOOLS_IMAGE} as tools
FROM ${PARENT_IMAGE}

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

WORKDIR C:\inetpub\wwwroot

# Copy developer tools and entrypoint
COPY --from=tools C:\tools C:\tools
COPY ./Hdis.Connectors.Dam.Bynder.SitecoreXp.Web.config.xdt c:\inetpub\wwwroot
RUN . 'C:\\tools\\scripts\\Invoke-XdtTransform.ps1' -Path 'C:\\inetpub\\wwwroot\\web.config' -XdtPath 'C:\\inetpub\\wwwroot\\Hdis.Connectors.Dam.Bynder.SitecoreXp.Web.config.xdt' -XdtDllPath 'C:\\tools\\bin\\Microsoft.Web.XmlTransform.dll';
