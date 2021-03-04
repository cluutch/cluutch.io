class V2::QuotesController < ApplicationController
  before_action :set_v2_quote, only: %w[ show edit update destroy ]
  before_action :set_jurisdictions, only: %w[ new edit ]

  # GET /v2/quotes
  # GET /v2/quotes.json
  def index
    @v2_quotes = V2::Quote.all
  end

  # GET /v2/quotes/1
  # GET /v2/quotes/1.json
  def show
  end

  # GET /v2/quotes/new
  def new
    orig_id = params[:clone_id]

    orig = V2::Quote.find(orig_id) if orig_id.present?

    if orig_id.present?
      @v2_quote = orig.clone
      puts @v2_quote.date
    else
      @v2_quote = V2::Quote.new
    end
  end

  # GET /v2/quotes/1/edit
  def edit
  end

  # POST /v2/quotes
  def create
    @v2_quote = V2::Quote.new(v2_quote_params)

    respond_to do |format|
      if @v2_quote.save
        format.html { redirect_to @v2_quote, notice: "Quote was successfully created." }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /v2/quotes/1
  def update
    respond_to do |format|
      if @v2_quote.update(v2_quote_params)
        format.html { redirect_to @v2_quote, notice: "Quote was successfully updated." }
      else
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /v2/quotes/1
  def destroy
    @v2_quote.destroy
    respond_to do |format|
      format.html { redirect_to v2_quotes_url, notice: "Quote was successfully destroyed." }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_v2_quote
      @v2_quote = V2::Quote.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def v2_quote_params
      params.require(:v2_quote).permit(:date, :vendor_name, :vendor_url, :vendor_branch, :is_primary, :price_per_ounce, :v2_jurisdiction_id)
    end

    def set_jurisdictions
      @jurisdictions = V2::Jurisdiction.select(:id, :name).map { |j|  [j.name, j.id] }
    end
end
