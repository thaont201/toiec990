/* 1000 từ vựng TOEIC hay gặp, chia theo chủ đề.
   Định dạng mỗi dòng: từ | loại từ | nghĩa tiếng Việt | phiên âm (IPA, giọng Mỹ)
   Loại từ: n = danh từ, v = động từ, adj = tính từ, adv = trạng từ, prep = giới từ, phr = cụm từ */

const VOCAB_EXTRA = parseVocab(`
# Công việc chung
accomplish|v|hoàn thành|/əˈkɑmplɪʃ/
achieve|v|đạt được|/əˈtʃiːv/
acquire|v|mua lại, giành được|/əˈkwaɪər/
adjust|v|điều chỉnh|/əˈdʒʌst/
agenda|n|chương trình nghị sự|/əˈdʒendə/
agreement|n|thỏa thuận|/əˈɡriːmənt/
announce|v|thông báo|/əˈnaʊns/
approve|v|phê duyệt|/əˈpruːv/
assign|v|phân công|/əˈsaɪn/
assess|v|đánh giá|/əˈses/
attendance|n|sự tham dự|/əˈtendəns/
authorize|v|ủy quyền, cho phép|/ˈɔːθəraɪz/
available|adj|có sẵn, rảnh|/əˈveɪləbl/
branch|n|chi nhánh|/bræntʃ/
budget|n|ngân sách|/ˈbʌdʒɪt/
capacity|n|năng lực, sức chứa|/kəˈpæsəti/
category|n|danh mục|/ˈkætəɡɔːri/
client|n|khách hàng|/ˈklaɪənt/
collaborate|v|hợp tác|/kəˈlæbəreɪt/
colleague|n|đồng nghiệp|/ˈkɑliːɡ/
commitment|n|cam kết|/kəˈmɪtmənt/
comply|v|tuân thủ|/kəmˈplaɪ/
concern|n|mối quan tâm|/kənˈsɜːrn/
conduct|v|tiến hành|/kənˈdʌkt/
confidential|adj|bảo mật|/ˌkɑnfɪˈdenʃl/
consult|v|tham khảo ý kiến|/kənˈsʌlt/
contribute|v|đóng góp|/kənˈtrɪbjuːt/
convenient|adj|thuận tiện|/kənˈviːniənt/
coordinate|v|phối hợp|/koʊˈɔːrdɪneɪt/
criteria|n|tiêu chí|/kraɪˈtɪriə/
current|adj|hiện tại|/ˈkɜːrənt/
deadline|n|hạn chót|/ˈdedlaɪn/
decline|v|từ chối, giảm|/dɪˈklaɪn/
delegate|v|ủy quyền cho ai đó|/ˈdeləɡeɪt/
demonstrate|v|chứng minh, trình diễn|/ˈdemənstreɪt/
department|n|phòng ban|/dɪˈpɑːrtmənt/
depend|v|phụ thuộc|/dɪˈpend/
detailed|adj|chi tiết|/dɪˈteɪld/
directly|adv|trực tiếp|/dəˈrektli/
discuss|v|thảo luận|/dɪˈskʌs/
distribute|v|phân phát|/dɪˈstrɪbjuːt/
document|n|tài liệu|/ˈdɑkjumənt/
eliminate|v|loại bỏ|/ɪˈlɪmɪneɪt/
employ|v|thuê, sử dụng|/ɪmˈplɔɪ/
encourage|v|khuyến khích|/ɪnˈkɜːrɪdʒ/
establish|v|thành lập|/ɪˈstæblɪʃ/
evaluate|v|đánh giá|/ɪˈvæljueɪt/
exceed|v|vượt quá|/ɪkˈsiːd/
execute|v|thực hiện|/ˈeksɪkjuːt/
expand|v|mở rộng|/ɪkˈspænd/
expense|n|chi phí|/ɪkˈspens/
facility|n|cơ sở vật chất|/fəˈsɪləti/
feedback|n|phản hồi|/ˈfiːdbæk/
finalize|v|hoàn tất|/ˈfaɪnəlaɪz/
flexible|adj|linh hoạt|/ˈfleksəbl/
forecast|n|dự báo|/ˈfɔːrkæst/
function|n|chức năng|/ˈfʌŋkʃn/
generate|v|tạo ra|/ˈdʒenəreɪt/
guideline|n|hướng dẫn|/ˈɡaɪdlaɪn/
handle|v|xử lý|/ˈhændl/
identify|v|xác định|/aɪˈdentɪfaɪ/
inform|v|thông báo|/ɪnˈfɔːrm/
initiate|v|khởi xướng|/ɪˈnɪʃieɪt/
innovative|adj|sáng tạo|/ˈɪnəveɪtɪv/
inspect|v|kiểm tra|/ɪnˈspekt/
instruction|n|hướng dẫn|/ɪnˈstrʌkʃn/
involve|v|liên quan, bao gồm|/ɪnˈvɑlv/
issue|n|vấn đề, số phát hành|/ˈɪʃuː/
launch|v|ra mắt|/lɔːntʃ/
maintain|v|duy trì|/meɪnˈteɪn/
manual|n|sổ tay hướng dẫn|/ˈmænjuəl/
minutes|n|biên bản cuộc họp|/ˈmɪnɪts/
mission|n|sứ mệnh|/ˈmɪʃn/
monitor|v|giám sát|/ˈmɑnɪtər/
objective|n|mục tiêu|/əbˈdʒektɪv/
obtain|v|đạt được, có được|/əbˈteɪn/
occasionally|adv|thỉnh thoảng|/əˈkeɪʒənəli/
operate|v|vận hành|/ˈɑpəreɪt/
opportunity|n|cơ hội|/ˌɑpərˈtuːnəti/
organize|v|tổ chức|/ˈɔːrɡənaɪz/
overall|adj|tổng thể|/ˌoʊvərˈɔːl/
participate|v|tham gia|/pɑːrˈtɪsɪpeɪt/
policy|n|chính sách|/ˈpɑləsi/
potential|adj|tiềm năng|/pəˈtenʃl/
precise|adj|chính xác|/prɪˈsaɪs/
prepare|v|chuẩn bị|/prɪˈper/
priority|n|ưu tiên|/praɪˈɔːrəti/
procedure|n|quy trình|/prəˈsiːdʒər/
productive|adj|năng suất|/prəˈdʌktɪv/
progress|n|tiến độ, tiến triển|/ˈprɑɡres/
project|n|dự án|/ˈprɑdʒekt/
promote|v|thúc đẩy, thăng chức|/prəˈmoʊt/
proposal|n|đề xuất|/prəˈpoʊzl/
prospect|n|khách hàng tiềm năng|/ˈprɑspekt/
qualify|v|đủ điều kiện|/ˈkwɑlɪfaɪ/
recommend|v|đề xuất, khuyên|/ˌrekəˈmend/
reduce|v|giảm|/rɪˈduːs/
reference|n|tham khảo, thư giới thiệu|/ˈrefrəns/
regarding|prep|liên quan đến|/rɪˈɡɑrdɪŋ/
register|v|đăng ký|/ˈredʒɪstər/
regulation|n|quy định|/ˌreɡjuˈleɪʃn/
release|v|phát hành|/rɪˈliːs/
relevant|adj|liên quan|/ˈreləvənt/
reliable|adj|đáng tin cậy|/rɪˈlaɪəbl/
remind|v|nhắc nhở|/rɪˈmaɪnd/
renovate|v|cải tạo|/ˈrenəveɪt/
represent|v|đại diện|/ˌreprɪˈzent/
request|n|yêu cầu|/rɪˈkwest/
require|v|yêu cầu, đòi hỏi|/rɪˈkwaɪər/
reschedule|v|lên lịch lại|/riːˈskedʒuːl/
resolve|v|giải quyết|/rɪˈzɑlv/
respond|v|phản hồi|/rɪˈspɑnd/
responsibility|n|trách nhiệm|/rɪˌspɑnsəˈbɪləti/
restructure|v|tái cơ cấu|/riːˈstrʌktʃər/
review|n|sự xem xét, bài đánh giá|/rɪˈvjuː/
revise|v|sửa đổi|/rɪˈvaɪz/
schedule|n|lịch trình|/ˈskedʒuːl/
select|v|lựa chọn|/sɪˈlekt/
significant|adj|đáng kể|/sɪɡˈnɪfɪkənt/
specialize|v|chuyên về|/ˈspeʃəlaɪz/
strategy|n|chiến lược|/ˈstrætədʒi/
submit|v|nộp|/səbˈmɪt/
supervise|v|giám sát|/ˈsuːpərvaɪz/
supplement|v|bổ sung|/ˈsʌplɪment/
temporary|adj|tạm thời|/ˈtempəreri/
terminate|v|chấm dứt|/ˈtɜːrmɪneɪt/
training|n|đào tạo|/ˈtreɪnɪŋ/
transfer|v|chuyển, điều chuyển|/trænsˈfɜːr/
update|v|cập nhật|/ʌpˈdeɪt/
verify|v|xác minh|/ˈverɪfaɪ/
version|n|phiên bản|/ˈvɜːrʒn/
# Tài chính - kế toán
account|n|tài khoản|/əˈkaʊnt/
accountant|n|kế toán viên|/əˈkaʊntnt/
accrue|v|tích lũy|/əˈkruː/
allowance|n|khoản trợ cấp, phụ cấp|/əˈlaʊəns/
annual|adj|hằng năm|/ˈænjuəl/
asset|n|tài sản|/ˈæset/
audit|n|kiểm toán|/ˈɔːdɪt/
balance|n|số dư|/ˈbæləns/
bankrupt|adj|phá sản|/ˈbæŋkrʌpt/
bonus|n|tiền thưởng|/ˈboʊnəs/
capital|n|vốn|/ˈkæpɪtl/
cash flow|n|dòng tiền|/kæʃ floʊ/
collect|v|thu (tiền)|/kəˈlekt/
commission|n|tiền hoa hồng|/kəˈmɪʃn/
compensate|v|bồi thường, đền bù|/ˈkɑmpənseɪt/
consolidate|v|hợp nhất|/kənˈsɑlɪdeɪt/
cost|n|chi phí|/kɔːst/
credit|n|tín dụng|/ˈkredɪt/
currency|n|tiền tệ|/ˈkɜːrənsi/
debt|n|nợ|/det/
deduct|v|khấu trừ|/dɪˈdʌkt/
deficit|n|thâm hụt|/ˈdefɪsɪt/
deposit|n|tiền đặt cọc, tiền gửi|/dɪˈpɑzɪt/
depreciation|n|khấu hao|/dɪˌpriːʃiˈeɪʃn/
dividend|n|cổ tức|/ˈdɪvɪdend/
earnings|n|thu nhập, lợi nhuận|/ˈɜːrnɪŋz/
equity|n|vốn chủ sở hữu|/ˈekwəti/
estimate|n|ước tính|/ˈestɪmət/
exchange rate|n|tỷ giá hối đoái|/ɪksˈtʃeɪndʒ reɪt/
expenditure|n|khoản chi tiêu|/ɪkˈspendɪtʃər/
financial|adj|tài chính|/faɪˈnænʃl/
fiscal|adj|thuộc tài khóa, tài chính|/ˈfɪskl/
fund|n|quỹ|/fʌnd/
gross|adj|tổng (trước thuế)|/ɡroʊs/
income|n|thu nhập|/ˈɪnkʌm/
interest|n|lãi suất, tiền lãi|/ˈɪntrəst/
invest|v|đầu tư|/ɪnˈvest/
investor|n|nhà đầu tư|/ɪnˈvestər/
invoice|n|hóa đơn|/ˈɪnvɔɪs/
liability|n|nợ phải trả, trách nhiệm pháp lý|/ˌlaɪəˈbɪləti/
loan|n|khoản vay|/loʊn/
margin|n|biên lợi nhuận|/ˈmɑrdʒɪn/
net|adj|ròng (sau thuế)|/net/
payable|adj|phải trả|/ˈpeɪəbl/
payroll|n|bảng lương|/ˈpeɪroʊl/
pension|n|lương hưu|/ˈpenʃn/
profit|n|lợi nhuận|/ˈprɑfɪt/
quarterly|adj|hằng quý|/ˈkwɔːrtərli/
receipt|n|biên lai|/rɪˈsiːt/
receivable|adj|phải thu|/rɪˈsiːvəbl/
reimburse|v|hoàn trả chi phí|/ˌriːɪmˈbɜːrs/
retain|v|giữ lại|/rɪˈteɪn/
revenue|n|doanh thu|/ˈrevənuː/
shareholder|n|cổ đông|/ˈʃerhoʊldər/
statement|n|bản sao kê, báo cáo|/ˈsteɪtmənt/
surplus|n|thặng dư|/ˈsɜːrplʌs/
tax|n|thuế|/tæks/
taxable|adj|chịu thuế|/ˈtæksəbl/
transaction|n|giao dịch|/trænˈzækʃn/
treasury|n|kho bạc, ngân quỹ|/ˈtreʒəri/
underpaid|adj|bị trả lương thấp|/ˌʌndərˈpeɪd/
valuation|n|sự định giá|/ˌvæljuˈeɪʃn/
withdraw|v|rút (tiền)|/wɪðˈdrɔː/
budget deficit|n|thâm hụt ngân sách|/ˈbʌdʒɪt ˈdefɪsɪt/
capital gain|n|lãi vốn|/ˈkæpɪtl ɡeɪn/
cash|n|tiền mặt|/kæʃ/
checking account|n|tài khoản séc|/ˈtʃekɪŋ əˈkaʊnt/
credit card|n|thẻ tín dụng|/ˈkredɪt kɑrd/
debit|n|ghi nợ|/ˈdebɪt/
economic|adj|thuộc kinh tế|/ˌekəˈnɑmɪk/
economize|v|tiết kiệm|/ɪˈkɑnəmaɪz/
financial statement|n|báo cáo tài chính|/faɪˈnænʃl ˈsteɪtmənt/
interest rate|n|lãi suất|/ˈɪntrəst reɪt/
loss|n|khoản lỗ|/lɔːs/
mortgage|n|thế chấp, khoản vay mua nhà|/ˈmɔːrɡɪdʒ/
net income|n|thu nhập ròng|/net ˈɪnkʌm/
outstanding|adj|chưa thanh toán|/ˌaʊtˈstændɪŋ/
overdue|adj|quá hạn|/ˌoʊvərˈduː/
price|n|giá|/praɪs/
profit margin|n|biên lợi nhuận|/ˈprɑfɪt ˈmɑrdʒɪn/
refund|n|tiền hoàn lại|/ˈriːfʌnd/
reserve|n|dự trữ|/rɪˈzɜːrv/
round off|v|làm tròn|/raʊnd ɔːf/
savings|n|tiền tiết kiệm|/ˈseɪvɪŋz/
shortfall|n|khoản thiếu hụt|/ˈʃɔːrtfɔːl/
stock|n|cổ phiếu, hàng tồn kho|/stɑk/
tax return|n|tờ khai thuế|/tæks rɪˈtɜːrn/
unpaid|adj|chưa được trả|/ʌnˈpeɪd/
value|n|giá trị|/ˈvæljuː/
voucher|n|phiếu, chứng từ|/ˈvaʊtʃər/
wage|n|tiền công|/weɪdʒ/
yield|n|lợi suất|/jiːld/
cost-effective|adj|hiệu quả về chi phí|/kɔːst ɪˈfektɪv/
financial year|n|năm tài chính|/faɪˈnænʃl jɪr/
accrual|n|sự dồn tích|/əˈkruːl/
amortize|v|phân bổ dần|/ˈæmərtaɪz/
bill|n|hóa đơn, dự luật|/bɪl/
cashier|n|thu ngân|/kæˈʃɪr/
credit limit|n|hạn mức tín dụng|/ˈkredɪt ˈlɪmɪt/
dividend payout|n|việc chi trả cổ tức|/ˈdɪvɪdend ˈpeaʊt/
expense report|n|báo cáo chi phí|/ɪkˈspens rɪˈpɔːrt/
fee|n|phí|/fiː/
insolvent|adj|mất khả năng thanh toán|/ɪnˈsɑlvənt/
ledger|n|sổ cái|/ˈledʒər/
liquidity|n|tính thanh khoản|/lɪˈkwɪdəti/
out of pocket|phr|tự chi trả|/aʊt əv ˈpɑkɪt/
pay raise|n|tăng lương|/peɪ reɪz/
pay slip|n|phiếu lương|/peɪ slɪp/
payment|n|khoản thanh toán|/ˈpeɪmənt/
price tag|n|nhãn giá|/praɪs tæɡ/
quote|n|báo giá|/kwoʊt/
receivables|n|khoản phải thu|/rɪˈsiːvəblz/
retail price|n|giá bán lẻ|/ˈriːteɪl praɪs/
sum|n|số tiền|/sʌm/
surcharge|n|phụ phí|/ˈsɜːrtʃɑrdʒ/
turnover|n|doanh thu, luân chuyển|/ˈtɜːrnoʊvər/
# Marketing - bán hàng
advertisement|n|quảng cáo|/ˌædvərˈtaɪzmənt/
advertise|v|quảng cáo|/ˈædvərtaɪz/
audience|n|khán giả, đối tượng|/ˈɔːdiəns/
brand|n|thương hiệu|/brænd/
campaign|n|chiến dịch|/kæmˈpeɪn/
catalog|n|danh mục sản phẩm|/ˈkætəlɔːɡ/
competitor|n|đối thủ cạnh tranh|/kəmˈpetɪtər/
consumer|n|người tiêu dùng|/kənˈsuːmər/
customer loyalty|n|lòng trung thành của khách hàng|/ˈkʌstəmər ˈlɔɪəlti/
demand|n|nhu cầu|/dɪˈmænd/
discount|n|giảm giá|/ˈdɪskaʊnt/
distributor|n|nhà phân phối|/dɪˈstrɪbjətər/
exclusive|adj|độc quyền|/ɪkˈsklusɪv/
exposure|n|sự phô bày, mức độ tiếp cận|/ɪkˈspoʊʒər/
feature|n|tính năng|/ˈfiːtʃər/
flyer|n|tờ rơi|/ˈflaɪər/
franchise|n|nhượng quyền|/ˈfræntʃaɪz/
goods|n|hàng hóa|/ɡʊdz/
handout|n|tài liệu phát tay|/ˈhændaʊt/
identify|v|nhận diện|/aɪˈdentɪfaɪ/
image|n|hình ảnh, uy tín|/ˈɪmɪdʒ/
inventory|n|hàng tồn kho|/ˈɪnvəntɔːri/
launch|n|sự ra mắt|/lɔːntʃ/
logo|n|logo|/ˈloʊɡoʊ/
market share|n|thị phần|/ˈmɑrkɪt ʃer/
marketing|n|tiếp thị|/ˈmɑrkɪtɪŋ/
merchandise|n|hàng hóa|/ˈmɜːrtʃəndaɪz/
newsletter|n|bản tin|/ˈnuːzletər/
offer|n|ưu đãi|/ˈɔːfər/
on sale|phr|đang giảm giá|/ɑn seɪl/
outlet|n|cửa hàng, điểm bán|/ˈaʊtlet/
packaging|n|bao bì|/ˈpækɪdʒɪŋ/
partner|n|đối tác|/ˈpɑrtnər/
persuade|v|thuyết phục|/pərˈsweɪd/
popular|adj|phổ biến|/ˈpɑpjələr/
preference|n|sở thích|/ˈprefrəns/
premium|adj|cao cấp|/ˈpriːmiəm/
product|n|sản phẩm|/ˈprɑdʌkt/
promotion|n|khuyến mãi, xúc tiến|/prəˈmoʊʃn/
prototype|n|nguyên mẫu|/ˈproʊtətaɪp/
publicity|n|sự quảng bá|/pʌbˈlɪsəti/
purchase|v|mua hàng|/ˈpɜːrtʃəs/
rebate|n|tiền hoàn lại|/ˈriːbeɪt/
recognize|v|nhận ra, công nhận|/ˈrekəɡnaɪz/
referral|n|sự giới thiệu|/rɪˈfɜːrəl/
reputation|n|danh tiếng|/ˌrepjuˈteɪʃn/
retailer|n|nhà bán lẻ|/ˈriːteɪlər/
sales|n|doanh số, bán hàng|/seɪlz/
sample|n|mẫu|/ˈsæmpl/
sponsor|n|nhà tài trợ|/ˈspɑnsər/
subscribe|v|đăng ký (dịch vụ)|/səbˈskraɪb/
survey|n|khảo sát|/ˈsɜːrveɪ/
target|n|mục tiêu|/ˈtɑrɡɪt/
trend|n|xu hướng|/trend/
unique|adj|độc đáo|/juˈniːk/
vendor|n|nhà cung cấp|/ˈvendər/
wholesale|n|bán buôn|/ˈhoʊlseɪl/
advertising agency|n|công ty quảng cáo|/ˈædvərtaɪzɪŋ ˈeɪdʒənsi/
bestseller|n|sách/sản phẩm bán chạy|/ˌbestˈselər/
brand awareness|n|nhận diện thương hiệu|/brænd əˈwernəs/
buyer|n|người mua|/ˈbaɪər/
commercial|n|quảng cáo (truyền hình)|/kəˈmɜːrʃl/
consumer goods|n|hàng tiêu dùng|/kənˈsuːmər ɡʊdz/
cross-sell|v|bán chéo|/krɔːs sel/
customer base|n|tập khách hàng|/ˈkʌstəmər beɪs/
direct mail|n|thư quảng cáo trực tiếp|/dəˈrekt meɪl/
e-commerce|n|thương mại điện tử|/ˈiː kɑmɜːrs/
exhibit|n|gian hàng triển lãm|/ɪɡˈzɪbɪt/
focus group|n|nhóm khảo sát|/ˈfoʊkəs ɡruːp/
go on sale|phr|bắt đầu bán|/ɡoʊ ɑn seɪl/
hot seller|n|hàng bán chạy|/hɑt ˈselər/
incentive|n|ưu đãi khuyến khích|/ɪnˈsentɪv/
invoice number|n|số hóa đơn|/ˈɪnvɔɪs ˈnʌmbər/
join forces|phr|hợp sức|/dʒɔɪn ˈfɔːrsɪz/
key account|n|khách hàng chủ chốt|/ki əˈkaʊnt/
loyalty program|n|chương trình khách hàng thân thiết|/ˈlɔɪəlti ˈproʊɡræm/
mass market|n|thị trường đại chúng|/mæs ˈmɑrkɪt/
multinational|adj|đa quốc gia|/ˌmʌltiˈnæʃnəl/
niche|n|thị trường ngách|/nɪtʃ/
pitch|n|bài thuyết trình chào hàng|/pɪtʃ/
price war|n|cuộc chiến giá cả|/praɪs wɔːr/
product line|n|dòng sản phẩm|/ˈprɑdʌkt laɪn/
profit target|n|mục tiêu lợi nhuận|/ˈprɑfɪt ˈtɑrɡɪt/
retention|n|sự giữ chân khách hàng|/rɪˈtenʃn/
sales representative|n|đại diện bán hàng|/seɪlz ˌreprɪˈzentətɪv/
sales target|n|chỉ tiêu bán hàng|/seɪlz ˈtɑrɡɪt/
slogan|n|khẩu hiệu|/ˈsloʊɡən/
social media|n|mạng xã hội|/ˈsoʊʃl ˈmiːdiə/
spokesperson|n|người phát ngôn|/ˈspoʊkspɜːrsn/
storefront|n|mặt tiền cửa hàng|/ˈstɔːrfrʌnt/
target audience|n|đối tượng mục tiêu|/ˈtɑrɡɪt ˈɔːdiəns/
trade show|n|hội chợ thương mại|/treɪd ʃoʊ/
upsell|v|bán thêm sản phẩm cao cấp|/ˈʌpsel/
value proposition|n|giá trị đề xuất|/ˈvæljuː ˌprɑpəˈzɪʃn/
warranty card|n|thẻ bảo hành|/ˈwɔːrənti kɑrd/
# Nhân sự - tuyển dụng
applicant|n|ứng viên|/ˈæplɪkənt/
application|n|đơn xin việc|/ˌæplɪˈkeɪʃn/
appoint|v|bổ nhiệm|/əˈpɔɪnt/
apprentice|n|người học việc|/əˈprentɪs/
attendance record|n|bảng chấm công|/əˈtendəns ˈrekərd/
background|n|lý lịch, kinh nghiệm|/ˈbækɡraʊnd/
benefit|n|phúc lợi|/ˈbenɪfɪt/
candidate|n|ứng viên|/ˈkændɪdeɪt/
certificate|n|chứng chỉ|/sərˈtɪfɪkət/
compensation|n|lương thưởng|/ˌkɑmpenˈseɪʃn/
contract|n|hợp đồng lao động|/ˈkɑntrækt/
dismiss|v|sa thải|/dɪsˈmɪs/
employee|n|nhân viên|/ɪmˈplɔɪiː/
employer|n|người sử dụng lao động|/ɪmˈplɔɪər/
employment|n|việc làm|/ɪmˈplɔɪmənt/
experience|n|kinh nghiệm|/ɪkˈspɪriəns/
expertise|n|chuyên môn|/ˌekspərˈtiːz/
full-time|adj|toàn thời gian|/ˌfʊl ˈtaɪm/
hire|v|thuê|/haɪər/
human resources|n|nhân sự|/ˈhjuːmən rɪˈsɔːrsɪz/
interview|n|buổi phỏng vấn|/ˈɪntərvjuː/
job description|n|mô tả công việc|/dʒɑb dɪˈskrɪpʃn/
junior|adj|cấp dưới, mới vào nghề|/ˈdʒuːniər/
leave|n|nghỉ phép|/liːv/
manager|n|quản lý|/ˈmænɪdʒər/
merit|n|năng lực, công trạng|/ˈmerɪt/
motivate|v|tạo động lực|/ˈmoʊtɪveɪt/
overtime|n|làm thêm giờ|/ˈoʊvərtaɪm/
part-time|adj|bán thời gian|/ˌpɑːrt ˈtaɪm/
performance|n|hiệu suất làm việc|/pərˈfɔːrməns/
personnel|n|nhân sự|/ˌpɜːrsəˈnel/
position|n|vị trí|/pəˈzɪʃn/
promotion|n|sự thăng chức|/prəˈmoʊʃn/
qualification|n|bằng cấp, trình độ|/ˌkwɑlɪfɪˈkeɪʃn/
recruit|v|tuyển dụng|/rɪˈkruːt/
recruitment|n|sự tuyển dụng|/rɪˈkruːtmənt/
redundancy|n|sự dư thừa lao động|/rɪˈdʌndənsi/
reference check|n|kiểm tra thư giới thiệu|/ˈrefrəns tʃek/
registration|n|sự đăng ký|/ˌredʒɪˈstreɪʃn/
resign|v|từ chức|/rɪˈzaɪn/
resume|n|sơ yếu lý lịch|/ˈrezəmeɪ/
retirement|n|sự nghỉ hưu|/rɪˈtaɪərmənt/
salary|n|lương tháng|/ˈsæləri/
seniority|n|thâm niên|/ˌsiːniˈɔːrəti/
shift|n|ca làm việc|/ʃɪft/
skill|n|kỹ năng|/skɪl/
staff turnover|n|tỷ lệ nghỉ việc|/stæf ˈtɜːrnoʊvər/
subordinate|n|cấp dưới|/səˈbɔːrdnət/
supervisor|n|giám sát viên|/ˈsuːpərvaɪzər/
trainee|n|thực tập sinh|/ˌtreɪˈniː/
vacancy|n|vị trí tuyển dụng còn trống|/ˈveɪkənsi/
workforce|n|lực lượng lao động|/ˈwɜːrkfɔːrs/
work schedule|n|lịch làm việc|/wɜːrk ˈskedʒuːl/
absence|n|sự vắng mặt|/ˈæbsəns/
bilingual|adj|song ngữ|/baɪˈlɪŋɡwəl/
commute|v|đi làm hằng ngày|/kəˈmjuːt/
competent|adj|có năng lực|/ˈkɑmpɪtənt/
conflict|n|xung đột|/ˈkɑnflɪkt/
credential|n|văn bằng, chứng nhận|/krəˈdenʃl/
diversity|n|sự đa dạng|/daɪˈvɜːrsəti/
employee benefits|n|phúc lợi nhân viên|/ɪmˈplɔɪiː ˈbenɪfɪts/
exit interview|n|phỏng vấn khi nghỉ việc|/ˈeksɪt ˈɪntərvjuː/
flextime|n|giờ làm việc linh hoạt|/ˈflekstaɪm/
grievance|n|khiếu nại|/ˈɡriːvəns/
headcount|n|số lượng nhân sự|/ˈhedkaʊnt/
induction|n|sự hướng dẫn nhận việc|/ɪnˈdʌkʃn/
intern|n|thực tập sinh|/ˈɪntɜːrn/
job opening|n|vị trí tuyển dụng|/dʒɑb ˈoʊpnɪŋ/
leadership|n|khả năng lãnh đạo|/ˈliːdərʃɪp/
morale|n|tinh thần làm việc|/məˈræl/
mentor|n|người cố vấn|/ˈmentɔːr/
occupation|n|nghề nghiệp|/ˌɑkjuˈpeɪʃn/
onboarding|n|quá trình hòa nhập công việc|/ˈɑnbɔːrdɪŋ/
pay scale|n|bậc lương|/peɪ skeɪl/
personnel file|n|hồ sơ nhân sự|/ˌpɜːrsəˈnel faɪl/
probation|n|thời gian thử việc|/proʊˈbeɪʃn/
productivity|n|năng suất|/ˌproʊdʌkˈtɪvəti/
raise|n|tăng lương|/reɪz/
recruiter|n|chuyên viên tuyển dụng|/rɪˈkruːtər/
responsibilities|n|trách nhiệm|/rɪˌspɑnsəˈbɪlətiz/
retrain|v|đào tạo lại|/riːˈtreɪn/
sick leave|n|nghỉ ốm|/sɪk liːv/
staff meeting|n|họp nhân viên|/stæf ˈmiːtɪŋ/
strengths|n|điểm mạnh|/streŋθs/
succession|n|sự kế nhiệm|/səkˈseʃn/
talent|n|nhân tài|/ˈtælənt/
termination|n|sự chấm dứt hợp đồng|/ˌtɜːrmɪˈneɪʃn/
time off|n|thời gian nghỉ|/taɪm ɔːf/
undergo|v|trải qua|/ˌʌndərˈɡoʊ/
union|n|công đoàn|/ˈjuːniən/
vocational|adj|thuộc nghề nghiệp|/voʊˈkeɪʃənl/
wage increase|n|tăng lương|/weɪdʒ ɪnˈkriːs/
work experience|n|kinh nghiệm làm việc|/wɜːrk ɪkˈspɪriəns/
workload|n|khối lượng công việc|/ˈwɜːrkloʊd/
work permit|n|giấy phép lao động|/wɜːrk ˈpɜːrmɪt/
# Du lịch - đi lại
aboard|prep|trên (tàu, máy bay)|/əˈbɔːrd/
airline|n|hãng hàng không|/ˈerlaɪn/
airport|n|sân bay|/ˈerpɔːrt/
arrival|n|sự đến nơi|/əˈraɪvl/
baggage|n|hành lý|/ˈbæɡɪdʒ/
board|v|lên (tàu, máy bay)|/bɔːrd/
booking|n|việc đặt chỗ|/ˈbʊkɪŋ/
boarding pass|n|thẻ lên máy bay|/ˈbɔːrdɪŋ pæs/
cancel|v|hủy|/ˈkænsl/
carrier|n|hãng vận chuyển|/ˈkæriər/
check in|v|làm thủ tục|/tʃek ɪn/
check-out|n|thủ tục trả phòng|/ˈtʃekaʊt/
connecting flight|n|chuyến bay nối chuyến|/kəˈnektɪŋ flaɪt/
delay|n|sự chậm trễ|/dɪˈleɪ/
departure|n|sự khởi hành|/dɪˈpɑːrtʃər/
destination|n|điểm đến|/ˌdestɪˈneɪʃn/
direct flight|n|chuyến bay thẳng|/dəˈrekt flaɪt/
domestic|adj|trong nước|/dəˈmestɪk/
economy class|n|hạng phổ thông|/ɪˈkɑnəmi klæs/
embark|v|lên tàu|/ɪmˈbɑːrk/
excursion|n|chuyến tham quan|/ɪkˈskɜːrʒn/
expedition|n|chuyến thám hiểm|/ˌekspəˈdɪʃn/
fare|n|tiền vé|/fer/
flight|n|chuyến bay|/flaɪt/
gate|n|cửa lên máy bay|/ɡeɪt/
itinerary|n|lịch trình chuyến đi|/aɪˈtɪnəreri/
journey|n|hành trình|/ˈdʒɜːrni/
landing|n|sự hạ cánh|/ˈlændɪŋ/
luggage|n|hành lý|/ˈlʌɡɪdʒ/
navigate|v|điều hướng|/ˈnævɪɡeɪt/
overseas|adv|ở nước ngoài|/ˌoʊvərˈsiːz/
passenger|n|hành khách|/ˈpæsɪndʒər/
passport|n|hộ chiếu|/ˈpæspɔːrt/
reservation|n|sự đặt chỗ|/ˌrezərˈveɪʃn/
route|n|tuyến đường|/ruːt/
seat|n|chỗ ngồi|/siːt/
shuttle|n|xe đưa đón|/ˈʃʌtl/
station|n|nhà ga|/ˈsteɪʃn/
ticket|n|vé|/ˈtɪkɪt/
tour|n|chuyến du lịch|/tʊr/
trip|n|chuyến đi|/trɪp/
transit|n|sự quá cảnh|/ˈtrænzɪt/
travel agency|n|công ty du lịch|/ˈtrævl ˈeɪdʒənsi/
visa|n|thị thực|/ˈviːzə/
voyage|n|chuyến đi biển|/ˈvɔɪɪdʒ/
weigh|v|cân|/weɪ/
abroad|adv|ở nước ngoài|/əˈbrɔːd/
airfare|n|giá vé máy bay|/ˈerfer/
airplane|n|máy bay|/ˈerpleɪn/
baggage claim|n|khu nhận hành lý|/ˈbæɡɪdʒ kleɪm/
boarding|n|sự lên máy bay|/ˈbɔːrdɪŋ/
car rental|n|dịch vụ thuê xe|/kɑr ˈrentl/
commuter|n|người đi làm xa|/kəˈmjuːtər/
delayed|adj|bị hoãn|/dɪˈleɪd/
depart|v|khởi hành|/dɪˈpɑːrt/
destination city|n|thành phố đến|/ˌdestɪˈneɪʃn ˈsɪti/
driver's license|n|bằng lái xe|/ˈdraɪvərz ˈlaɪsns/
excess baggage|n|hành lý quá cước|/ɪkˈses ˈbæɡɪdʒ/
flight attendant|n|tiếp viên hàng không|/flaɪt əˈtendənt/
freight|n|hàng hóa vận chuyển|/freɪt/
highway|n|đường cao tốc|/ˈhaɪweɪ/
hotel reservation|n|đặt phòng khách sạn|/hoʊˈtel ˌrezərˈveɪʃn/
immigration|n|nhập cảnh|/ˌɪmɪˈɡreɪʃn/
inspection|n|sự kiểm tra|/ɪnˈspekʃn/
lane|n|làn đường|/leɪn/
local|adj|địa phương|/ˈloʊkl/
miss|v|lỡ (chuyến)|/mɪs/
pilot|n|phi công|/ˈpaɪlət/
platform|n|sân ga|/ˈplætfɔːrm/
rail|n|đường sắt|/reɪl/
rush hour|n|giờ cao điểm|/rʌʃ ˈaʊər/
sightseeing|n|tham quan|/ˈsaɪtsiːɪŋ/
souvenir|n|quà lưu niệm|/ˌsuːvəˈnɪr/
subway|n|tàu điện ngầm|/ˈsʌbweɪ/
taxi|n|taxi|/ˈtæksi/
terminal|n|nhà ga, bến|/ˈtɜːrmɪnl/
tourist|n|khách du lịch|/ˈtʊrɪst/
toll|n|phí cầu đường|/toʊl/
traffic|n|giao thông|/ˈtræfɪk/
transportation|n|vận chuyển, phương tiện|/ˌtrænspɔːrˈteɪʃn/
travel expense|n|chi phí đi lại|/ˈtrævl ɪkˈspens/
travel itinerary|n|lịch trình du lịch|/ˈtrævl aɪˈtɪnəreri/
trip cancellation|n|việc hủy chuyến đi|/trɪp ˌkænsəˈleɪʃn/
upgrade|v|nâng hạng|/ˌʌpˈɡreɪd/
vehicle|n|phương tiện|/ˈviːhɪkl/
visitor|n|khách tham quan|/ˈvɪzɪtər/
waiting list|n|danh sách chờ|/ˈweɪtɪŋ lɪst/
window seat|n|ghế cạnh cửa sổ|/ˈwɪndoʊ siːt/
# Khách sạn - nhà hàng
accommodation|n|chỗ ở|/əˌkɑməˈdeɪʃn/
amenity|n|tiện nghi|/əˈmiːnəti/
banquet|n|tiệc lớn|/ˈbæŋkwɪt/
beverage|n|đồ uống|/ˈbevərɪdʒ/
buffet|n|tiệc buffet|/bəˈfeɪ/
catering|n|dịch vụ ăn uống|/ˈkeɪtərɪŋ/
chef|n|đầu bếp|/ʃef/
cuisine|n|ẩm thực|/kwɪˈziːn/
dessert|n|món tráng miệng|/dɪˈzɜːrt/
dining|n|việc ăn uống|/ˈdaɪnɪŋ/
dish|n|món ăn|/dɪʃ/
entrée|n|món chính|/ˈɑntreɪ/
guest|n|khách|/ɡest/
host|n|chủ nhà, người dẫn chương trình|/hoʊst/
hotel|n|khách sạn|/hoʊˈtel/
housekeeping|n|dịch vụ dọn phòng|/ˈhaʊskiːpɪŋ/
lobby|n|sảnh|/ˈlɑbi/
lodging|n|chỗ ở|/ˈlɑdʒɪŋ/
menu|n|thực đơn|/ˈmenjuː/
occupancy|n|tỷ lệ phòng có khách|/ˈɑkjupənsi/
pastry|n|bánh ngọt|/ˈpeɪstri/
reception|n|lễ tân|/rɪˈsepʃn/
recipe|n|công thức nấu ăn|/ˈresəpi/
reservation desk|n|quầy đặt phòng|/ˌrezərˈveɪʃn desk/
restaurant|n|nhà hàng|/ˈrestrɑnt/
room service|n|dịch vụ phòng|/ruːm ˈsɜːrvɪs/
serve|v|phục vụ|/sɜːrv/
server|n|nhân viên phục vụ|/ˈsɜːrvər/
suite|n|phòng suite|/swiːt/
tip|n|tiền boa|/tɪp/
vacancy|n|phòng trống|/ˈveɪkənsi/
waiter|n|bồi bàn|/ˈweɪtər/
waitress|n|nữ bồi bàn|/ˈweɪtrəs/
wine list|n|danh sách rượu vang|/waɪn lɪst/
complimentary|adj|miễn phí|/ˌkɑmplɪˈmentri/
courtesy|n|sự lịch thiệp, dịch vụ miễn phí|/ˈkɜːrtəsi/
departure time|n|giờ trả phòng|/dɪˈpɑːrtʃər taɪm/
extend|v|gia hạn|/ɪkˈstend/
front desk|n|quầy lễ tân|/frʌnt desk/
guest room|n|phòng khách|/ɡest ruːm/
hospitality|n|ngành khách sạn, sự hiếu khách|/ˌhɑspɪˈtæləti/
ingredient|n|nguyên liệu|/ɪnˈɡriːdiənt/
key card|n|thẻ từ mở cửa phòng|/kiː kɑrd/
laundry|n|dịch vụ giặt ủi|/ˈlɔːndri/
linen|n|khăn trải giường|/ˈlɪnɪn/
luxury|adj|sang trọng|/ˈlʌkʃəri/
meal|n|bữa ăn|/miːl/
minibar|n|tủ lạnh mini|/ˈmɪniˌbɑr/
overbook|v|nhận đặt phòng quá số lượng|/ˌoʊvərˈbʊk/
patron|n|khách quen|/ˈpeɪtrən/
resort|n|khu nghỉ dưỡng|/rɪˈzɔːrt/
seating|n|chỗ ngồi|/ˈsiːtɪŋ/
spa|n|spa|/spɑ/
special diet|n|chế độ ăn đặc biệt|/ˈspeʃl ˈdaɪət/
specialty|n|đặc sản|/ˈspeʃəlti/
stay|n|thời gian lưu trú|/steɪ/
swimming pool|n|hồ bơi|/ˈswɪmɪŋ puːl/
toiletries|n|đồ dùng vệ sinh cá nhân|/ˈtɔɪlətriz/
view|n|tầm nhìn, khung cảnh|/vjuː/
voucher|n|phiếu giảm giá|/ˈvaʊtʃər/
accommodate|v|đáp ứng, chứa được|/əˈkɑmədeɪt/
appetizer|n|món khai vị|/ˈæpɪtaɪzər/
bill|n|hóa đơn|/bɪl/
booking confirmation|n|xác nhận đặt chỗ|/ˈbʊkɪŋ ˌkɑnfərˈmeɪʃn/
chef's special|n|món đặc biệt của đầu bếp|/ʃefs ˈspeʃl/
checkout|n|việc thanh toán và trả phòng|/ˈtʃekaʊt/
cover charge|n|phí phục vụ|/ˈkʌvər tʃɑrdʒ/
dietary|adj|liên quan đến chế độ ăn|/ˈdaɪəteri/
dine|v|ăn tối|/daɪn/
dining room|n|phòng ăn|/ˈdaɪnɪŋ ruːm/
doorman|n|nhân viên đón khách|/ˈdɔːrmən/
fine dining|n|ẩm thực cao cấp|/faɪn ˈdaɪnɪŋ/
guest list|n|danh sách khách mời|/ɡest lɪst/
hospitable|adj|hiếu khách|/ˈhɑspɪtəbl/
hotel guest|n|khách lưu trú|/hoʊˈtel ɡest/
inn|n|quán trọ|/ɪn/
kitchen|n|nhà bếp|/ˈkɪtʃɪn/
mini-suite|n|phòng nhỏ|/ˈmɪni swiːt/
occupied|adj|đã có người ở|/ˈɑkjupaɪd/
ordering|n|việc gọi món|/ˈɔːrdərɪŋ/
potluck|n|bữa ăn góp món|/ˈpɑtlʌk/
rate|n|giá phòng|/reɪt/
reservation fee|n|phí đặt chỗ|/ˌrezərˈveɪʃn fiː/
restaurant review|n|bài đánh giá nhà hàng|/ˈrestrɑnt rɪˈvjuː/
sommelier|n|người phụ trách rượu vang|/ˌsʌməlˈjeɪ/
standby|n|chờ, dự phòng|/ˈstændbaɪ/
steward|n|nhân viên phục vụ|/ˈstuːərd/
take-out|n|đồ ăn mang đi|/ˈteɪkaʊt/
waiting staff|n|nhân viên phục vụ bàn|/ˈweɪtɪŋ stæf/
# Sản xuất - kho vận
assembly|n|lắp ráp|/əˈsembli/
batch|n|lô hàng|/bætʃ/
capacity|n|công suất|/kəˈpæsəti/
carton|n|thùng carton|/ˈkɑrtn/
cargo|n|hàng hóa|/ˈkɑrɡoʊ/
component|n|linh kiện|/kəmˈpoʊnənt/
defect|n|lỗi, khuyết tật|/ˈdiːfekt/
deliver|v|giao hàng|/dɪˈlɪvər/
delivery|n|sự giao hàng|/dɪˈlɪvəri/
dispatch|v|gửi đi, điều phối|/dɪˈspætʃ/
distribution|n|sự phân phối|/ˌdɪstrɪˈbjuːʃn/
efficiency|n|hiệu quả|/ɪˈfɪʃnsi/
equipment|n|thiết bị|/ɪˈkwɪpmənt/
factory|n|nhà máy|/ˈfæktəri/
freight forwarder|n|công ty giao nhận|/freɪt ˈfɔːrwərdər/
fulfill|v|hoàn thành (đơn hàng)|/fʊlˈfɪl/
goods receipt|n|phiếu nhập kho|/ɡʊdz rɪˈsiːt/
inspect|v|kiểm tra|/ɪnˈspekt/
inventory control|n|kiểm soát tồn kho|/ˈɪnvəntɔːri kənˈtroʊl/
label|n|nhãn|/ˈleɪbl/
load|v|chất hàng|/loʊd/
machinery|n|máy móc|/məˈʃiːnəri/
maintenance|n|bảo trì|/ˈmeɪntənəns/
manufacture|v|sản xuất|/ˌmænjuˈfæktʃər/
manufacturer|n|nhà sản xuất|/ˌmænjuˈfæktʃərər/
material|n|nguyên vật liệu|/məˈtɪriəl/
output|n|sản lượng|/ˈaʊtpʊt/
overstock|n|hàng tồn kho dư thừa|/ˌoʊvərˈstɑk/
package|n|kiện hàng, gói hàng|/ˈpækɪdʒ/
packing|n|đóng gói|/ˈpækɪŋ/
pallet|n|pallet|/ˈpælɪt/
plant|n|nhà máy|/plænt/
production|n|sản xuất|/prəˈdʌkʃn/
quality control|n|kiểm soát chất lượng|/ˈkwɑləti kənˈtroʊl/
raw materials|n|nguyên liệu thô|/rɔː məˈtɪriəlz/
recall|n|thu hồi sản phẩm|/rɪˈkɔːl/
receive|v|nhận|/rɪˈsiːv/
replenish|v|bổ sung hàng|/rɪˈplenɪʃ/
restock|v|nhập hàng lại|/riːˈstɑk/
retooling|n|tái trang bị máy móc|/riːˈtuːlɪŋ/
safety|n|an toàn|/ˈseɪfti/
shipment|n|lô hàng vận chuyển|/ˈʃɪpmənt/
shipping|n|vận chuyển|/ˈʃɪpɪŋ/
shortage|n|sự thiếu hụt|/ˈʃɔːrtɪdʒ/
specification|n|thông số kỹ thuật|/ˌspesɪfɪˈkeɪʃn/
stock|n|hàng tồn|/stɑk/
storage|n|kho lưu trữ|/ˈstɔːrɪdʒ/
supplier|n|nhà cung cấp|/səˈplaɪər/
supply chain|n|chuỗi cung ứng|/səˈplaɪ tʃeɪn/
technician|n|kỹ thuật viên|/tekˈnɪʃn/
tracking|n|theo dõi|/ˈtrækɪŋ/
transport|v|vận chuyển|/trænˈspɔːrt/
undamaged|adj|không hư hỏng|/ʌnˈdæmɪdʒd/
unload|v|dỡ hàng|/ʌnˈloʊd/
utilize|v|sử dụng|/ˈjuːtəlaɪz/
vendor|n|nhà cung ứng|/ˈvendər/
warehouse|n|nhà kho|/ˈwerhaʊs/
wholesale|n|bán sỉ|/ˈhoʊlseɪl/
workshop|n|xưởng|/ˈwɜːrkʃɑp/
assemble|v|lắp ráp|/əˈsembl/
backorder|n|đơn hàng chờ bổ sung|/ˈbækɔːrdər/
bottleneck|n|điểm nghẽn|/ˈbɑtlnek/
capacity utilization|n|tỷ lệ sử dụng công suất|/kəˈpæsəti ˌjuːtəlaɪˈzeɪʃn/
commodity|n|hàng hóa thiết yếu|/kəˈmɑdəti/
consignment|n|lô hàng ký gửi|/kənˈsaɪnmənt/
container|n|container|/kənˈteɪnər/
delay|n|sự chậm trễ|/dɪˈleɪ/
deliverable|n|sản phẩm bàn giao|/dɪˈlɪvərəbl/
dock|n|bến bốc dỡ hàng|/dɑk/
export|v|xuất khẩu|/ɪkˈspɔːrt/
faulty|adj|bị lỗi|/ˈfɔːlti/
import|v|nhập khẩu|/ɪmˈpɔːrt/
in stock|phr|còn hàng|/ɪn stɑk/
inventory level|n|mức tồn kho|/ˈɪnvəntɔːri ˈlevl/
lead time|n|thời gian chờ hàng|/liːd taɪm/
logistics|n|hậu cần|/loʊˈdʒɪstɪks/
manufacturing|n|sản xuất chế tạo|/ˌmænjuˈfæktʃərɪŋ/
operator|n|người vận hành|/ˈɑpəreɪtər/
order fulfillment|n|hoàn thành đơn hàng|/ˈɔːrdər fʊlˈfɪlmənt/
out of stock|phr|hết hàng|/aʊt əv stɑk/
overhead|n|chi phí chung|/ˈoʊvərhed/
pack|v|đóng gói|/pæk/
production line|n|dây chuyền sản xuất|/prəˈdʌkʃn laɪn/
quota|n|hạn ngạch|/ˈkwoʊtə/
reorder|v|đặt hàng lại|/riːˈɔːrdər/
scrap|n|phế liệu|/skræp/
shipping cost|n|phí vận chuyển|/ˈʃɪpɪŋ kɔːst/
shop floor|n|xưởng sản xuất|/ʃɑp flɔːr/
stockroom|n|kho hàng|/ˈstɑkruːm/
tariff|n|thuế quan|/ˈtærɪf/
truck|n|xe tải|/trʌk/
unit|n|đơn vị|/ˈjuːnɪt/
vessel|n|tàu|/ˈvesl/
wastage|n|sự lãng phí|/ˈweɪstɪdʒ/
warranty claim|n|yêu cầu bảo hành|/ˈwɔːrənti kleɪm/
# Công nghệ - văn phòng
access|n|quyền truy cập|/ˈækses/
application|n|ứng dụng|/ˌæplɪˈkeɪʃn/
attachment|n|tệp đính kèm|/əˈtætʃmənt/
backup|n|bản sao lưu|/ˈbækʌp/
browser|n|trình duyệt|/ˈbraʊzər/
bug|n|lỗi phần mềm|/bʌɡ/
cable|n|dây cáp|/ˈkeɪbl/
software|n|phần mềm|/ˈsɔftwer/
hardware|n|phần cứng|/ˈhɑrdwer/
computer|n|máy tính|/kəmˈpjuːtər/
server|n|máy chủ|/ˈsɜːrvər/
database|n|cơ sở dữ liệu|/ˈdeɪtəbeɪs/
download|v|tải xuống|/ˈdaʊnloʊd/
upload|v|tải lên|/ˈʌploʊd/
password|n|mật khẩu|/ˈpæswɜːrd/
network|n|mạng|/ˈnetwɜːrk/
internet|n|internet|/ˈɪntərnet/
online|adj|trực tuyến|/ˌɑnˈlaɪn/
offline|adj|ngoại tuyến|/ˌɔːfˈlaɪn/
print|v|in|/prɪnt/
printer|n|máy in|/ˈprɪntər/
photocopier|n|máy photocopy|/ˈfoʊtoʊˌkɑpiər/
scanner|n|máy quét|/ˈskænər/
spreadsheet|n|bảng tính|/ˈspredʃiːt/
file|n|tệp, hồ sơ|/faɪl/
folder|n|thư mục|/ˈfoʊldər/
install|v|cài đặt|/ɪnˈstɔːl/
malfunction|v|hoạt động sai, trục trặc|/ˌmælˈfʌŋkʃn/
monitor|n|màn hình|/ˈmɑnɪtər/
keyboard|n|bàn phím|/ˈkiːbɔːrd/
mouse|n|chuột|/maʊs/
display|n|màn hình hiển thị|/dɪˈspleɪ/
update|n|bản cập nhật|/ˈʌpdeɪt/
upgrade|n|bản nâng cấp|/ˈʌpɡreɪd/
technical|adj|kỹ thuật|/ˈteknɪkl/
troubleshoot|v|khắc phục sự cố|/ˈtrʌbl̩ʃuːt/
website|n|trang web|/ˈwebsaɪt/
wireless|adj|không dây|/ˈwaɪərləs/
interface|n|giao diện|/ˈɪntərfeɪs/
data|n|dữ liệu|/ˈdeɪtə/
digital|adj|kỹ thuật số|/ˈdɪdʒɪtl/
encrypt|v|mã hóa|/ɪnˈkrɪpt/
firewall|n|tường lửa|/ˈfaɪərwɔːl/
security|n|an ninh, bảo mật|/səˈkjʊrəti/
storage device|n|thiết bị lưu trữ|/ˈstɔːrɪdʒ dɪˈvaɪs/
system|n|hệ thống|/ˈsɪstəm/
tablet|n|máy tính bảng|/ˈtæblət/
telecommunication|n|viễn thông|/ˌtelɪkəˌmjuːnɪˈkeɪʃn/
virus|n|vi-rút|/ˈvaɪrəs/
wifi|n|wifi|/ˈwaɪfaɪ/
connect|v|kết nối|/kəˈnekt/
disconnect|v|ngắt kết nối|/ˌdɪskəˈnekt/
electronic|adj|điện tử|/ɪˌlekˈtrɑnɪk/
equipment failure|n|hỏng thiết bị|/ɪˈkwɪpmənt ˈfeɪljər/
help desk|n|bộ phận hỗ trợ kỹ thuật|/ˈhelp desk/
hotline|n|đường dây nóng|/ˈhɑtlaɪn/
log in|v|đăng nhập|/lɔːɡ ɪn/
log out|v|đăng xuất|/lɔːɡ aʊt/
mainframe|n|máy tính lớn|/ˈmeɪnfreɪm/
modem|n|modem|/ˈmoʊdem/
module|n|mô-đun|/ˈmɑdʒuːl/
notebook|n|máy tính xách tay|/ˈnoʊtbʊk/
operating system|n|hệ điều hành|/ˈɑpəreɪtɪŋ ˈsɪstəm/
password reset|n|đặt lại mật khẩu|/ˈpæswɜːrd riːˈset/
projector|n|máy chiếu|/prəˈdʒektər/
recycle|v|tái chế|/riːˈsaɪkl/
remote|adj|từ xa|/rɪˈmoʊt/
search engine|n|công cụ tìm kiếm|/sɜːrtʃ ˈendʒɪn/
software license|n|giấy phép phần mềm|/ˈsɔftwer ˈlaɪsns/
stationery|n|văn phòng phẩm|/ˈsteɪʃəneri/
tech support|n|hỗ trợ kỹ thuật|/tek səˈpɔːrt/
transmit|v|truyền tải|/trænsˈmɪt/
user|n|người dùng|/ˈjuːzər/
version control|n|kiểm soát phiên bản|/ˈvɜːrʒn kənˈtroʊl/
video conference|n|hội nghị truyền hình|/ˈvɪdioʊ ˈkɑnfərəns/
voicemail|n|hộp thư thoại|/ˈvɔɪsmeɪl/
workstation|n|trạm làm việc|/ˈwɜːrkˌsteɪʃn/
block|v|chặn|/blɑk/
cloud|n|đám mây|/klaʊd/
configure|v|cấu hình|/kənˈfɪɡjər/
crash|v|sập, treo máy|/kræʃ/
delete|v|xóa|/dɪˈliːt/
device|n|thiết bị|/dɪˈvaɪs/
digital signature|n|chữ ký số|/ˈdɪdʒɪtl ˈsɪɡnətʃər/
email|n|thư điện tử|/ˈiːmeɪl/
hard drive|n|ổ cứng|/hɑrd draɪv/
hyperlink|n|siêu liên kết|/ˈhaɪpərlɪŋk/
icon|n|biểu tượng|/ˈaɪkɑn/
input|n|dữ liệu nhập|/ˈɪnpʊt/
laptop|n|máy tính xách tay|/ˈlæptɑp/
menu|n|thực đơn, menu|/ˈmenjuː/
optimize|v|tối ưu hóa|/ˈɑptɪmaɪz/
output|n|kết quả đầu ra|/ˈaʊtpʊt/
paste|v|dán|/peɪst/
restart|v|khởi động lại|/riːˈstɑrt/
save|v|lưu|/seɪv/
software update|n|cập nhật phần mềm|/ˈsɔftwer ˈʌpdeɪt/
spam|n|thư rác|/spæm/
toolbar|n|thanh công cụ|/ˈtuːlbɑr/
# Hợp đồng - pháp lý - bảo hiểm
amend|v|sửa đổi|/əˈmend/
appeal|n|kháng cáo|/əˈpiːl/
arbitration|n|trọng tài|/ˌɑrbɪˈtreɪʃn/
assignment|n|sự chuyển nhượng|/əˈsaɪnmənt/
binding|adj|có ràng buộc pháp lý|/ˈbaɪndɪŋ/
breach|n|sự vi phạm|/briːtʃ/
clause|n|điều khoản|/klɔːz/
compliance|n|sự tuân thủ|/kəmˈplaɪəns/
confidentiality|n|tính bảo mật|/ˌkɑnfɪdenʃiˈæləti/
consent|n|sự đồng ý|/kənˈsent/
damages|n|tiền bồi thường thiệt hại|/ˈdæmɪdʒɪz/
defendant|n|bị đơn|/dɪˈfendənt/
deliberate|adj|cố ý|/dɪˈlɪbərət/
dispute|n|tranh chấp|/dɪˈspjuːt/
enforce|v|thi hành|/ɪnˈfɔːrs/
execute|v|ký kết, thực thi|/ˈeksɪkjuːt/
expire|v|hết hạn|/ɪkˈspaɪər/
guarantee|n|sự bảo đảm|/ˌɡærənˈtiː/
hearing|n|phiên điều trần|/ˈhɪrɪŋ/
indemnify|v|bồi hoàn|/ɪnˈdemnɪfaɪ/
injunction|n|lệnh cấm|/ɪnˈdʒʌŋkʃn/
jurisdiction|n|thẩm quyền pháp lý|/ˌdʒʊrɪsˈdɪkʃn/
law firm|n|công ty luật|/lɔː fɜːrm/
lawsuit|n|vụ kiện|/ˈlɔːsuːt/
legal|adj|hợp pháp|/ˈliːɡl/
liable|adj|chịu trách nhiệm pháp lý|/ˈlaɪəbl/
license|n|giấy phép|/ˈlaɪsns/
notary|n|công chứng viên|/ˈnoʊtəri/
notify|v|thông báo|/ˈnoʊtɪfaɪ/
obligation|n|nghĩa vụ|/ˌɑblɪˈɡeɪʃn/
party|n|bên (trong hợp đồng)|/ˈpɑrti/
penalty|n|tiền phạt|/ˈpenəlti/
plaintiff|n|nguyên đơn|/ˈpleɪntɪf/
policy|n|hợp đồng bảo hiểm|/ˈpɑləsi/
premium|n|phí bảo hiểm|/ˈpriːmiəm/
prohibit|v|cấm|/prəˈhɪbɪt/
provision|n|điều khoản quy định|/prəˈvɪʒn/
ratify|v|phê chuẩn|/ˈrætɪfaɪ/
renewal|n|sự gia hạn|/rɪˈnuːəl/
representative|n|người đại diện|/ˌreprɪˈzentətɪv/
rescind|v|hủy bỏ|/rɪˈsɪnd/
resolution|n|nghị quyết|/ˌrezəˈluːʃn/
settlement|n|sự dàn xếp|/ˈsetlmənt/
signature|n|chữ ký|/ˈsɪɡnətʃər/
statute|n|đạo luật|/ˈstætʃuːt/
subject to|phr|tùy thuộc vào|/ˈsʌbdʒɪkt tuː/
terms and conditions|n|điều khoản và điều kiện|/tɜːrmz ænd kənˈdɪʃnz/
trademark|n|nhãn hiệu|/ˈtreɪdmɑrk/
verdict|n|phán quyết|/ˈvɜːrdɪkt/
violation|n|sự vi phạm|/ˌvaɪəˈleɪʃn/
waiver|n|sự miễn trừ|/ˈweɪvər/
witness|n|nhân chứng|/ˈwɪtnəs/
accident|n|tai nạn|/ˈæksɪdənt/
beneficiary|n|người thụ hưởng|/ˌbenɪˈfɪʃieri/
claim|n|yêu cầu bồi thường|/kleɪm/
coverage|n|phạm vi bảo hiểm|/ˈkʌvərɪdʒ/
deductible|n|mức khấu trừ bảo hiểm|/dɪˈdʌktəbl/
exclusion|n|điều khoản loại trừ|/ɪkˈskluːʒn/
insurance|n|bảo hiểm|/ɪnˈʃʊrəns/
insurer|n|công ty bảo hiểm|/ɪnˈʃʊrər/
insured|n|người được bảo hiểm|/ɪnˈʃʊrd/
liability insurance|n|bảo hiểm trách nhiệm|/ˌlaɪəˈbɪləti ɪnˈʃʊrəns/
policyholder|n|người mua bảo hiểm|/ˈpɑləsihoʊldər/
premium payment|n|thanh toán phí bảo hiểm|/ˈpriːmiəm ˈpeɪmənt/
proof|n|bằng chứng|/pruːf/
underwriter|n|người thẩm định bảo hiểm|/ˈʌndərraɪtər/
authority|n|cơ quan có thẩm quyền|/əˈθɔːrəti/
bond|n|trái phiếu|/bɑnd/
contractor|n|nhà thầu|/kənˈtræktər/
copyright|n|bản quyền|/ˈkɑpiraɪt/
credential check|n|kiểm tra giấy tờ|/krəˈdenʃl tʃek/
due diligence|n|thẩm định, điều tra kỹ lưỡng|/duː ˈdɪlɪdʒəns/
engagement|n|hợp đồng dịch vụ, sự tham gia|/ɪnˈɡeɪdʒmənt/
evidence|n|bằng chứng|/ˈevɪdəns/
fraud|n|gian lận|/frɔːd/
hazard|n|mối nguy hiểm|/ˈhæzərd/
illegal|adj|bất hợp pháp|/ɪˈliːɡl/
imprisonment|n|sự bỏ tù|/ɪmˈprɪznmənt/
inspection report|n|báo cáo kiểm tra|/ɪnˈspekʃn rɪˈpɔːrt/
legislation|n|luật pháp|/ˌledʒɪsˈleɪʃn/
misconduct|n|hành vi sai trái|/ˌmɪsˈkɑndʌkt/
negligence|n|sự cẩu thả|/ˈneɡlɪdʒəns/
notarize|v|công chứng|/ˈnoʊtəraɪz/
oath|n|lời thề|/oʊθ/
official|adj|chính thức|/əˈfɪʃl/
patent|n|bằng sáng chế|/ˈpeɪtnt/
proceed|v|tiến hành|/prəˈsiːd/
prosecute|v|truy tố|/ˈprɑsɪkjuːt/
recovery|n|sự thu hồi|/rɪˈkʌvəri/
retain counsel|phr|thuê luật sư|/rɪˈteɪn ˈkaʊnsl/
statute of limitations|n|thời hiệu|/ˈstætʃuːt əv ˌlɪmɪˈteɪʃnz/
suspension|n|sự đình chỉ|/səˈspenʃn/
transfer of ownership|n|chuyển nhượng quyền sở hữu|/trænsˈfɜːr əv ˈoʊnərʃɪp/
unauthorized|adj|không được phép|/ʌnˈɔːθəraɪzd/
void|adj|vô hiệu|/vɔɪd/
# Mua sắm - khách hàng - bất động sản
apartment|n|căn hộ|/əˈpɑrtmənt/
appliance|n|thiết bị gia dụng|/əˈplaɪəns/
bargain|n|món hời|/ˈbɑrɡən/
brochure|n|tờ quảng cáo gấp|/broʊˈʃʊr/
cancellation|n|sự hủy|/ˌkænsəˈleɪʃn/
catalogue|n|danh mục sản phẩm|/ˈkætəlɔːɡ/
checkout counter|n|quầy thanh toán|/ˈtʃekaʊt ˈkaʊntər/
clearance|n|sự thanh lý hàng|/ˈklɪrəns/
complaint|n|khiếu nại|/kəmˈpleɪnt/
complimentary gift|n|quà tặng kèm|/ˌkɑmplɪˈmentri ɡɪft/
consumer rights|n|quyền người tiêu dùng|/kənˈsuːmər raɪts/
coupon|n|phiếu giảm giá|/ˈkuːpɑn/
courier|n|người chuyển phát|/ˈkʊriər/
customer service|n|dịch vụ khách hàng|/ˈkʌstəmər ˈsɜːrvɪs/
defective|adj|bị lỗi|/dɪˈfektɪv/
deliver|v|giao|/dɪˈlɪvər/
discount rate|n|tỷ lệ chiết khấu|/ˈdɪskaʊnt reɪt/
dispatch|n|sự gửi đi|/dɪˈspætʃ/
exchange|v|đổi hàng|/ɪksˈtʃeɪndʒ/
express delivery|n|giao hàng nhanh|/ɪkˈspres dɪˈlɪvəri/
feedback form|n|mẫu phản hồi|/ˈfiːdbæk fɔːrm/
gift card|n|thẻ quà tặng|/ɡɪft kɑrd/
guarantee|n|sự đảm bảo|/ˌɡærənˈtiː/
handling fee|n|phí xử lý|/ˈhændlɪŋ fiː/
in person|phr|trực tiếp|/ɪn ˈpɜːrsn/
invoice copy|n|bản sao hóa đơn|/ˈɪnvɔɪs ˈkɑpi/
item|n|mặt hàng|/ˈaɪtəm/
mail order|n|đặt hàng qua thư|/meɪl ˈɔːrdər/
membership|n|tư cách thành viên|/ˈmembərʃɪp/
merchant|n|thương nhân|/ˈmɜːrtʃənt/
order|n|đơn hàng|/ˈɔːrdər/
order form|n|mẫu đặt hàng|/ˈɔːrdər fɔːrm/
parcel|n|bưu kiện|/ˈpɑːrsl/
payment method|n|phương thức thanh toán|/ˈpeɪmənt ˈmeθəd/
point of sale|n|điểm bán hàng|/pɔɪnt əv seɪl/
price list|n|bảng giá|/praɪs lɪst/
receipt number|n|số biên lai|/rɪˈsiːt ˈnʌmbər/
refund policy|n|chính sách hoàn tiền|/ˈriːfʌnd ˈpɑləsi/
replace|v|thay thế|/rɪˈpleɪs/
return|v|trả lại|/rɪˈtɜːrn/
satisfaction|n|sự hài lòng|/ˌsætɪsˈfækʃn/
shopper|n|người mua sắm|/ˈʃɑpər/
special offer|n|ưu đãi đặc biệt|/ˈspeʃl ˈɔːfər/
store credit|n|tín dụng cửa hàng|/stɔːr ˈkredɪt/
tenant|n|người thuê nhà|/ˈtenənt/
landlord|n|chủ nhà|/ˈlændlɔːrd/
lease|n|hợp đồng thuê|/liːs/
rent|v|thuê|/rent/
property|n|bất động sản|/ˈprɑpərti/
real estate|n|bất động sản|/ˈriːəl ɪˈsteɪt/
building|n|tòa nhà|/ˈbɪldɪŋ/
office space|n|diện tích văn phòng|/ˈɔːfəs speɪs/
floor plan|n|sơ đồ mặt bằng|/flɔːr plæn/
square meter|n|mét vuông|/skwer ˈmiːtər/
location|n|vị trí|/loʊˈkeɪʃn/
neighborhood|n|khu phố|/ˈneɪbərhʊd/
commercial property|n|bất động sản thương mại|/kəˈmɜːrʃl ˈprɑpərti/
construction|n|xây dựng|/kənˈstrʌkʃn/
contractor|n|nhà thầu|/kənˈtræktər/
deposit|n|tiền đặt cọc|/dɪˈpɑzɪt/
down payment|n|tiền đặt cọc mua nhà|/daʊn ˈpeɪmənt/
move in|v|chuyển vào ở|/muːv ɪn/
move out|v|chuyển ra|/muːv aʊt/
occupancy permit|n|giấy phép sử dụng|/ˈɑkjupənsi pərˈmɪt/
parking space|n|chỗ đậu xe|/ˈpɑːrkɪŋ speɪs/
rental agreement|n|hợp đồng thuê nhà|/ˈrentl əˈɡriːmənt/
renovation|n|sự cải tạo|/ˌrenəˈveɪʃn/
security deposit|n|tiền đặt cọc an ninh|/səˈkjʊrəti dɪˈpɑzɪt/
sublease|n|hợp đồng thuê lại|/ˈsʌbliːs/
utilities|n|tiện ích, tiền điện nước|/juːˈtɪlətiz/
vacant|adj|trống|/ˈveɪkənt/
furnished|adj|được trang bị nội thất|/ˈfɜːrnɪʃt/
spacious|adj|rộng rãi|/ˈspeɪʃəs/
elevator|n|thang máy|/ˈelɪveɪtər/
maintenance fee|n|phí bảo trì|/ˈmeɪntənəns fiː/
amenities|n|tiện nghi|/əˈmiːnətiz/
bargain price|n|giá hời|/ˈbɑrɡən praɪs/
brand loyalty|n|lòng trung thành với thương hiệu|/brænd ˈlɔɪəlti/
consumer protection|n|bảo vệ người tiêu dùng|/kənˈsuːmər prəˈtekʃn/
cost of living|n|chi phí sinh hoạt|/kɔːst əv ˈlɪvɪŋ/
delivery charge|n|phí giao hàng|/dɪˈlɪvəri tʃɑrdʒ/
discounted|adj|được giảm giá|/ˈdɪskaʊntɪd/
exclusive offer|n|ưu đãi độc quyền|/ɪkˈsklusɪv ˈɔːfər/
hardware store|n|cửa hàng vật liệu|/ˈhɑrdwer stɔːr/
inconvenience|n|sự bất tiện|/ˌɪnkənˈviːniəns/
interior design|n|thiết kế nội thất|/ɪnˈtɪriər dɪˈzaɪn/
lot|n|lô đất|/lɑt/
mall|n|trung tâm thương mại|/mɔːl/
merchandise return|n|việc trả hàng|/ˈmɜːrtʃəndaɪz rɪˈtɜːrn/
on credit|phr|mua trả góp, ghi nợ|/ɑn ˈkredɪt/
open house|n|buổi tham quan nhà|/ˈoʊpən haʊs/
pricing|n|định giá|/ˈpraɪsɪŋ/
purchase order|n|đơn đặt hàng|/ˈpɜːrtʃəs ˈɔːrdər/
refurbish|v|tân trang|/riːˈfɜːrbɪʃ/
reimbursement|n|hoàn trả tiền|/ˌriːɪmˈbɜːrsmənt/
satisfied|adj|hài lòng|/ˈsætɪsfaɪd/
selection|n|sự lựa chọn|/sɪˈlekʃn/
shipment tracking|n|theo dõi vận chuyển|/ˈʃɪpmənt ˈtrækɪŋ/
storage unit|n|kho chứa đồ|/ˈstɔːrɪdʒ ˈjuːnɪt/
supermarket|n|siêu thị|/ˈsuːpərmɑːrkɪt/
transaction fee|n|phí giao dịch|/trænˈzækʃn fiː/
upscale|adj|cao cấp|/ˈʌpskeɪl/
warranty period|n|thời hạn bảo hành|/ˈwɔːrənti ˈpɪriəd/
`);

/* Phiên âm 28 từ mẫu (dùng khi có vocab.js; mục đích: hiển thị phiên âm cho cả bộ từ) */
const IPA_BASE = {
  allocate:'/ˈæləkeɪt/', invoice:'/ˈɪnvɔɪs/', reimburse:'/ˌriːɪmˈbɜːrs/', negotiate:'/nɪˈɡoʊʃieɪt/',
  postpone:'/poʊstˈpoʊn/', revenue:'/ˈrevənuː/', warranty:'/ˈwɔːrənti/', eligible:'/ˈelɪdʒəbl/',
  inventory:'/ˈɪnvəntɔːri/', merger:'/ˈmɜːrdʒər/', discrepancy:'/dɪˈskrepənsi/', accommodate:'/əˈkɑmədeɪt/',
  enclosed:'/ɪnˈkloʊzd/', tentative:'/ˈtentətɪv/', substantial:'/səbˈstænʃl/', expedite:'/ˈekspədaɪt/',
  retain:'/rɪˈteɪn/', surpass:'/sərˈpæs/', liable:'/ˈlaɪəbl/', complimentary:'/ˌkɑmplɪˈmentri/',
  'prior to':'/ˈpraɪər tuː/', implement:'/ˈɪmplɪment/', appoint:'/əˈpɔɪnt/', outstanding:'/ˌaʊtˈstændɪŋ/',
  hinder:'/ˈhɪndər/', commence:'/kəˈmens/', proofread:'/ˈpruːfriːd/', forfeit:'/ˈfɔːrfɪt/'
};

function parseVocab(raw){
  const POS = {n:'danh từ', v:'động từ', adj:'tính từ', adv:'trạng từ', prep:'giới từ', phr:'cụm từ'};
  let topic = '';
  const out = [];
  raw.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;
    if (line.startsWith('#')) { topic = line.slice(1).trim(); return; }
    const [w, p, m, ipa] = line.split('|').map(s => s.trim());
    if (!w || !m) return;
    out.push({w, m, ipa: ipa || '', ex: '', pos: POS[p] || p, topic});
  });
  return out;
}

function mergeVocab(base, extra){
  const seen = new Set();
  return [...base, ...extra].filter(v => {
    const key = v.w.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(v => ({...v, ipa: v.ipa || IPA_BASE[v.w] || ''}));
}
