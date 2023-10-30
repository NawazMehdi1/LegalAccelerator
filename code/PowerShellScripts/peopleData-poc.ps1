$LandingPageItemPath = '/sitecore/content/GowlingWLG/GowlingWLG/Home/PeopleLandingPage'
$PeoplePageTemplateID = '{9D6780DD-9CC1-42B6-A7F1-8C71CBD44BAF}'

$media = Get-Item -Path "/sitecore/media library/Feature/contentImport/PeoplePageData_POC"
# get stream and save content to variable $content
[System.IO.Stream]$body = $media.Fields["Blob"].GetBlobStream()
try    
{
    $contents = New-Object byte[] $body.Length
    $body.Read($contents, 0, $body.Length) | Out-Null
} 
finally 
{
    $body.Close()    
}


# convert to dynamic object
$importList = [System.Text.Encoding]::Default.GetString($contents) | ConvertFrom-Csv -Delimiter ","



foreach($row in $importList)
    {
        $targetLanguage = if($row.DocumentNamePath.contains('Équipe')){'fr-CA'}else{'en'}
        write-host($targetLanguage)
        if($row.DocumentName -ne '')
        {
            write-host($row.DocumentName)
            if(-not (gci -path $LandingPageItemPath | where-object{$_.Name -eq $row.DocumentName})){
                $PeopleItem = ni -Path $LandingPageItemPath -Name $row.DocumentName -ItemType $PeoplePageTemplateID -language $targetLanguage
                write-host("Editing the New Item Created")
            }
            else{
                $PeopleItemPath = $LandingPageItemPath + '/' + $row.DocumentName
                $PeopleItemLanguages = gi -path $PeopleItemPath -language * | where-object{$_.'TemplateID' -eq $PeoplePageTemplateID}
                $existingLanguage = ''
                foreach($PeopleItemLanguage in $PeopleItemLanguages){
                    $existingLanguage = $PeopleItemLanguage.Language
                    write-host($existingLanguage)
                    break
                }
                
                if(-not (gi -path $PeopleItemPath -language $targetLanguage | where-object{$_.'TemplateID' -eq $PeoplePageTemplateID})){
                    write-host('Item does not exists in the target Language')
                    $PeopleItem = gi -path $PeopleItemPath | Add-ItemLanguage -Language $existingLanguage -TargetLanguage $targetLanguage
                    
                }
                else{
                    write-host('Item exists in the target Language')
                    $PeopleItem = gi -path $PeopleItemPath -language $targetLanguage | where-object{$_.'TemplateID' -eq $PeoplePageTemplateID}
                }
            }
            
            $PeopleItem.Editing.BeginEdit()
                $PeopleItem['Title'] = $row.Title
                $PeopleItem['Content'] = $row.Summary
                $PeopleItem['Firstname'] = $row.Firstname
                $PeopleItem['Lastname'] = $row.Lastname
                $PeopleItem['Email'] = $row.Email
                $PeopleItem['PrimaryPhone'] = $row.PrimaryPhone
                $PeopleItem['PrimaryFax'] = if($row.PrimaryFax.tolower() -eq 'null'){''}else{$row.PrimaryFax}
                $PeopleItem['SecondaryPhone'] = if($row.SecondaryPhone.tolower() -eq 'null'){''}else{$row.SecondaryPhone}
                write-host($row.About)
                $PeopleItem['About'] = if($row.About.tolower() -eq 'null'){''}else{$row.About}
                write-host(' ')
                write-host('--')
                write-host(' ')
                write-host($PeopleItem['About'] )
                $PeopleItem['ClientWorkManual'] = if($row.ClientWorkManual.tolower() -eq 'null'){''}else{$row.ClientWorkManual}
                $PeopleItem['ExternalPublication'] =if($row.ExternalPublication.tolower() -eq 'null'){''}else{$row.ExternalPublication}
                $PeopleItem['Memberships'] = if($row.Memberships.tolower() -eq 'null'){''}else{$row.Memberships}
                $PeopleItem['PrimaryServices'] = if($row.PrimaryServices.tolower() -eq 'null'){''}else{$row.PrimaryServices}
                $PeopleItem['OfficesText'] = if($row.OfficesText.tolower() -eq 'null'){''}else{$row.OfficesText}
            $PeopleItem.Editing.EndEdit()
        }
    }
