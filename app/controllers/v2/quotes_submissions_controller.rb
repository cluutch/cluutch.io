class V2::QuotesSubmissionsController < ApplicationController
  before_action :set_v2_quotes_submission, only: %w[ show edit update destroy ]

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
    @v2_quotes_submission = V2::QuotesSubmission.new
    q = @v2_quotes_submission.quotes.build
    q.v2_jurisdiction_id = 4
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
        format.html { redirect_to @v2_quotes_submission, notice: "Quotes submission was successfully created." }
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
      if @v2_quotes_submission.update(v2_quotes_submission_params)
        format.html { redirect_to @v2_quotes_submission, notice: "Quotes submission was successfully updated." }
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
      @v2_quotes_submission = V2::QuotesSubmission.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v2_quotes_submission_params
      params.require(:v2_quotes_submission).permit(quotes_attributes: [:price_per_ounce, :v2_jurisdiction_id])
    end
end
