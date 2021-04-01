class V2::QuotesSubmissionsController < ApplicationController
  before_action :set_v2_quotes_submission, only: %w[ show edit update destroy ]
  before_action :http_authenticate, only: [:new, :create, :destroy, :index, :gen]

  # GET /v2/quotes_submissions
  # GET /v2/quotes_submissions.json
  def index
    @v2_quotes_submissions = V2::QuotesSubmission.all
  end

  # GET /v2/quotes_submissions/1
  # GET /v2/quotes_submissions/1.json
  def show
  end

  # GET /v2/quotes_submissions/new
  def new
    @v2_quotes_submission = V2::QuotesSubmission.new_prefilled_form
  end

  # POST
  def gen
    @v2_quotes_submission = V2::QuotesSubmission.new_prefilled_form
    respond_to do |format|
      if @v2_quotes_submission.save 
        format.json { render template: "v2/quotes_submissions/show", status: :created }
      else
        format.json { render json: @v2_quotes_submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET /v2/quotes_submissions/1/edit
  def edit
  end

  # POST /v2/quotes_submissions
  # POST /v2/quotes_submissions.json
  def create
    @v2_quotes_submission = V2::QuotesSubmission.new(v2_quotes_submission_params)

    respond_to do |format|
      if @v2_quotes_submission.save
        format.html { redirect_to v2_quotes_submission_path(@v2_quotes_submission, uuid: @v2_quotes_submission.uuid), notice: "Quotes submission was successfully created." }
        format.json { render :show, status: :created, location: @v2_quotes_submission }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @v2_quotes_submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /v2/quotes_submissions/1
  # PATCH/PUT /v2/quotes_submissions/1.json
  def update
    respond_to do |format|
      if !@v2_quotes_submission.is_confirmed && @v2_quotes_submission.update(v2_quotes_submission_params)
        puts "UPDATED"
        puts @v2_quotes_submission.uuid
        format.html { redirect_to v2_quotes_submission_path(@v2_quotes_submission, uuid: @v2_quotes_submission.uuid), notice: "Quotes submission was successfully updated." }
        format.json { render :show, status: :ok, location: @v2_quotes_submission }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @v2_quotes_submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /v2/quotes_submissions/1
  # DELETE /v2/quotes_submissions/1.json
  def destroy
    @v2_quotes_submission.destroy
    respond_to do |format|
      format.html { redirect_to v2_quotes_submissions_url, notice: "Quotes submission was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v2_quotes_submission
      uuid = params[:uuid] || params[:v2_quotes_submission][:uuid]
      @v2_quotes_submission = V2::QuotesSubmission.find_by(uuid: uuid, id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v2_quotes_submission_params
      params.require(:v2_quotes_submission).permit(quotes_attributes: [:id, :price_per_ounce, :v2_jurisdiction_id, :date, :vendor_name, :vendor_url, :vendor_branch, :is_primary])
    end
end
