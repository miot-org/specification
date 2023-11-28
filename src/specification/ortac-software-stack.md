# Ortac software stack

The diagram below shows how the Ortac software stack fits together

<img src="./ortac-software_stack.svg">

## Topic construction

The topic construction used varies at different levels of the stack. The full topic as sent to the MQTT broker contains 7 levels which are system rather than use oriented, so these are not used at the upper layers. Below are some examples of the full topic and in the table an indication as to which parts are used at different levels of the stack.

Ortac example:

`ortac/urn:mrn:itu:mmsi:299123456//X Ltd SN:1234/ortac/X Ltd SN:1234/Ch1/value/propulsion/oil/port/value`

NMEA 2000 example:

`ortac///Y Ltd SN:999123/N2K/Garmin 0056712/452/value/environment/saloon/air/humidity`

Breaking down the topics:

| name                 | Ortac example                 | NMEA 2000 example      | ortac-mqtt | ortac-sender | ortac-receiver |
| :---                 | :---                         | :---                   |   :---:   |    :---:    |     :---:     |
|`ortac`                | `ortac`                       | `ortac`                 |           |             |               |
|`<vesselURN>`         | `urn:mrn:itu:mmsi:299123456` |                        |           |             |               |
|`<blank> or _sys `    |                              |                        |           |             |               |
|`<OriginatorDeviceID>`|`X Ltd SN:1234`               |`Y Ltd SN:999123`       |     Y     |             |               |
|`<SourceSystem>/`     |`ortac`                        |`N2K`                   |     Y     |      P      |               |
|`<SourceDeviceID>/`   |`X Ltd SN:1234`               |`Garmin 0056712`        |     Y     |      P      |               |
|`<SensorID>`          |`Ch1`                         |`452`                   |     Y     |      P      |               |
|`<type>`              |`value`                       |`value`                 |     Y     |      Y      |       Y       |
|`<context>`           |`propulsion/port/oil`         |`environment/saloon/air`|     Y     |      Y      |       Y       |
|`<quantityID>`        |`pressure`                    |`humidity`              |     Y     |      Y      |       Y       |

P => means it is sent as a separate parameter. This is so that the topic used at the upper level by ortac-sender and ortac-receiver is the same.