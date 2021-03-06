'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const timestamp = new Date();
    const countries = [
      'United Kingdom',
      'United States',
      'China',
      'Canada',
      'Japan',
      'France',
      'Australia',
      'Germany',
      'Italy',
      'Afghanistan',
      'Albania',
      'Algeria',
      'American Samoa',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antigua and Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Austria',
      'Azerbaijan',
      'The Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bosnia and Herzegovina',
      'Botswana',
      'Brazil',
      'Brunei',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cambodia',
      'Cameroon',
      'Cape Verde',
      'Cayman Islands',
      'Central African Republic',
      'Chad',
      'Chile',
      'Christmas Island',
      'Cocos(Keeling) Islands',
      'Colombia',
      'Comoros',
      'Congo',
      'Cook Islands',
      'Costa Rica',
      'Cote d\'Ivoire',
      'Croatia',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'Equatorial Guinea',
      'Eritrea',
      'Estonia',
      'Ethiopia',
      'Falkland Islands',
      'Faroe Islands',
      'Fiji',
      'Finland',
      'French Polynesia',
      'Gabon',
      'The Gambia',
      'Georgia',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guadeloupe',
      'Guam',
      'Guatemala',
      'Guernsey',
      'Guinea',
      'Guinea - Bissau',
      'Guyana',
      'Haiti',
      'Honduras',
      'Hong Kong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Israel',
      'Jamaica',
      'Jersey',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'North Korea',
      'South Korea',
      'Kosovo',
      'Kuwait',
      'Kyrgyzstan',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstein',
      'Lithuania',
      'Luxembourg',
      'Macau',
      'Macedonia',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Islands',
      'Martinique',
      'Mauritania',
      'Mauritius',
      'Mayotte',
      'Mexico',
      'Micronesia',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Myanmar',
      'Nagorno - Karabakh',
      'Namibia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'Netherlands Antilles',
      'New Caledonia',
      'New Zealand',
      'Nicaragua',
      'Niger',
      'Nigeria',
      'Niue',
      'Norfolk Island',
      'Turkish Republic of Northern Cyprus',
      'Northern Mariana',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Palestine',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Pitcairn Islands',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Barthelemy',
      'Saint Helena',
      'Saint Kitts and Nevis',
      'Saint Lucia',
      'Saint Martin',
      'Saint Pierre and Miquelon',
      'Saint Vincent and the Grenadines',
      'Samoa',
      'San Marino',
      'Sao Tome and Principe',
      'Saudi Arabia',
      'Senegal',
      'Serbia',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Solomon Islands',
      'Somalia',
      'Somaliland',
      'South Africa',
      'South Ossetia',
      'Spain',
      'Sri Lanka',
      'Sudan',
      'Suriname',
      'Svalbard',
      'Swaziland',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      'Timor - Leste',
      'Togo',
      'Tokelau',
      'Tonga',
      'Transnistria Pridnestrovie',
      'Trinidad and Tobago',
      'Tristan da Cunha',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks and Caicos Islands',
      'Tuvalu',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'Uruguay',
      'Uzbekistan',
      'Vanuatu',
      'Vatican City',
      'Venezuela',
      'Vietnam',
      'British Virgin Islands',
      'Isle of Man',
      'US Virgin Islands',
      'Wallis and Futuna',
      'Western Sahara',
      'Yemen',
      'Zambia',
      'Zimbabwe'      
    ]

    return queryInterface.bulkInsert(
      'Locations',
      countries.map((country, index) => ({
        'id': index + 1,
        'label': country,
        'createdAt': timestamp,
        'updatedAt': timestamp
      })),
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      'Locations',
      null,
      {}
    );
  }
};
