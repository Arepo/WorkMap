require 'rails_helper'

describe 'primary map' do

	it 'displays the map on the homepage' do
		visit '/'
		expect(page).to have_css('#map')
	end

	it 'displays a marker at an address given by an employer' do
		job = Job.create name: 'Waitress', category: 'Bar', company: 'Queen of Hoxton', full_time: 'false', detail: 'Detailed description', location: 'EC2A 3JX', pay: 10, email: 'queen@hoxton-test.com', phone: '12345678'
		visit '/'
		expect(page).to have_css('.job')
	end

end