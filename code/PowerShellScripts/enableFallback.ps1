#$templateFolderPath = '/sitecore/templates/Foundation/JSS Experience Accelerator/Presentation'
#$templateFolderPath = '/sitecore/templates/Project/GowlingWLG'
$templateFolderPath = '/sitecore/templates/Project/GowlingWLG Site/Page Templates'


$userName = 'sanjeevi.ram.altudo.co'

#############################################################

$userName = $userName.replace('.','_')

$templateItems = gci -path $templateFolderPath | where-object {$_.'TemplateID' -ne '{0437FEE2-44C9-46A6-ABE9-28858D9FEE8C}'} 
#{0437FEE2-44C9-46A6-ABE9-28858D9FEE8C} - TemplateFolder Template ID


function EnableFallback{
[cmdletbinding()]
param ($Items)

    foreach($Item in $Items){
        $Item.editing.beginedit()
            $Item['__Enable item fallback'] = 1
        $Item.editing.endedit()
        write-host($Item.name + ' enabled Item fallback')
    }
}


function TemplateEnableFallback{
[cmdletbinding()]
param ($templateItems)

    foreach($templateItem in $templateItems){
        EnableFallback($templateItem)
        
        $StandardValuesItem = gci -path $templateItem.ID  | where-object{ $_.name.contains('Standard') -and $_.name.contains('Values')}
        
        EnableFallback($StandardValuesItem)
        # comment this to remove the Standard Values update
        
        $ReferrerItems = Get-ItemReferrer -ID $templateItem.ID | where-object {$_.name -ne $userName -and $_.fullpath.contains('/sitecore/content/GowlingWLG')}
        EnableFallback($ReferrerItems)
        # comment this to remove Referrer Items updated
    }
}


TemplateEnableFallback($templateItems)
