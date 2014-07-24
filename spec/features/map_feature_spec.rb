require 'rails_helper'

describe 'primary map' do

	it 'displays the map on the homepage', js: true do
		visit '/jobs'
		expect(page).to have_map
	end

	context 'markers' do

		it 'displays a marker for a job', js: true do
			job = Job.create advert_title: 'Waitress', category: 'Bar', company: 'Queen of Hoxton', full_time: 'false', detail: 'Detailed description', address: 'EC2A 3JX', wage: 10, email: 'queen@hoxton-test.com', phone: '12345678'
			visit '/jobs'
			expect(page.evaluate_script("window.map.markers.length")).to eq 1
		end

		it 'stops including bar markers when you uncheck the bar box', js: true do
			job = Job.create advert_title: 'Waitress', category: 'Bar', company: 'Queen of Hoxton', full_time: 'false', detail: 'Detailed description', address: 'EC2A 3JX', wage: 10, email: 'queen@hoxton-test.com', phone: '12345678'
			visit '/jobs'
			click_button 'Refine Search'
			expect(page.evaluate_script("window.map.markers[0]")).to be nil
		end

	end



end