require 'rails_helper'

RSpec.describe Job, :type => :model do

	context 'validating data for a new job' do
		it 'does not allow the creation of a job with no advert_title' do
			Job.create category: 'Bar', company: 'Test company', full_time: 'true', detail: 'Detailed description', address: 'EC2', wage: 10
			expect(Job.count).to eq 0
		end

		it 'does not allow the creation of a job with no company' do
			Job.create advert_title: 'Test job advert_title', full_time: 'true', detail: 'Detailed description', address: 'EC2', wage: 10
			expect(Job.count).to eq 0
		end

		it 'does not allow the creation of a job with no address' do
			Job.create advert_title: 'Test job advert_title', company: 'Test company', full_time: 'true', detail: 'Detailed description', wage: 10
			expect(Job.count).to eq 0
		end

		it 'does not allow the creation of a job with a wage that is not an integer number' do
			Job.create advert_title: 'Test job advert_title', company: 'Test company', full_time: 'true', detail: 'Detailed description', address: 'EC2', wage: 'test'
			expect(Job.count).to eq 0
		end

		it 'does not allow the creation of a job with an email that is not valid' do
			Job.create advert_title: 'Test job advert_title', company: 'Test company', full_time: 'true', detail: 'Detailed description', address: 'EC2', wage: 'test', email: 'testwrongemail'
			expect(Job.count).to eq 0
		end

		it 'does not allow the creation of a job with a advert_title that is more than 40 characters' do
			Job.create advert_title: 'Very long advert_title, way more than 40 characters, not acceptable, sorry.', company: 'Test company', full_time: 'true', detail: 'Detailed description', address: 'EC2', wage: 'test', email: 'example@test.com'
			expect(Job.count).to eq 0
		end
		
	end
end
